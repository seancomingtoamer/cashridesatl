// Paid-membership gatekeeper logic: grant on Stripe payment, revoke on cancel.
// Kept separate from the webhook route so it can be exercised by test scripts.
import { createMemberInviteLink, removeMemberFromGroup } from "@/lib/telegram";
import { sendEmail } from "@/lib/agentmail";
import { updateDriverRecord, type AirtableRecord, type DriverFields } from "@/lib/airtable";

export interface GrantResult {
  inviteLink: string | null;
  emailSent: boolean;
  error?: string;
}

function inviteEmailBody(name: string, inviteLink: string) {
  const first = (name || "").split(" ")[0] || "there";
  return `Hey ${first},

Your Cash Rides ATL driver membership is active. Welcome aboard.

Here's your personal invite to the drivers' community group — it works exactly once, so don't share it:

${inviteLink}

What you get as a member:
- Ride request dispatches straight to your email, 24/7
- The Cash Rides ATL community group
- Eligibility for the public driver roster at cashridesatl.com (upload your docs at cashridesatl.com/drivers/verify to get listed)

Questions? Just reply to this email.

— Sean
Cash Rides ATL
cashridesatl.com`;
}

/**
 * Grant group membership after a successful subscription payment:
 * mint a single-use invite link, stamp the Airtable record, email the driver.
 *
 * Never throws — the Stripe webhook must return 200 once the payment note is
 * recorded (its idempotency marker), so partial failures are reported in the
 * result and surfaced to Sean via the notify payload instead.
 */
export async function grantMembership(params: {
  recordId: string;
  email: string;
  name: string;
  customerId: string;
}): Promise<GrantResult> {
  const { recordId, email, name, customerId } = params;

  let inviteLink: string | null = null;
  let emailSent = false;
  let error: string | undefined;

  try {
    inviteLink = await createMemberInviteLink(recordId);
  } catch (e) {
    error = `invite creation failed: ${e instanceof Error ? e.message : e}`;
    console.error("[membership] createMemberInviteLink:", e);
  }

  try {
    await updateDriverRecord(recordId, {
      Membership_Status: "Paid",
      Stripe_Customer_ID: customerId,
      Membership_Start: new Date().toISOString().slice(0, 10),
      ...(inviteLink ? { Invite_Link: inviteLink } : {}),
    });
  } catch (e) {
    error = `${error ? error + "; " : ""}airtable membership update failed: ${e instanceof Error ? e.message : e}`;
    console.error("[membership] updateDriverRecord:", e);
  }

  if (inviteLink) {
    try {
      await sendEmail(
        email,
        "Your Cash Rides ATL group invite is here",
        inviteEmailBody(name, inviteLink)
      );
      emailSent = true;
    } catch (e) {
      error = `${error ? error + "; " : ""}invite email failed: ${e instanceof Error ? e.message : e}`;
      console.error("[membership] sendEmail:", e);
    }
  }

  return { inviteLink, emailSent, error };
}

export interface RevokeResult {
  removedFromGroup: boolean;
  error?: string;
}

/**
 * Revoke membership after a subscription ends: remove them from the Telegram
 * group (if the dispatcher recorded their user ID when they joined) and mark
 * the record Expired. Never throws — same webhook contract as grantMembership.
 */
export async function revokeMembership(
  driver: AirtableRecord<DriverFields>
): Promise<RevokeResult> {
  let removedFromGroup = false;
  let error: string | undefined;

  const telegramUserId = driver.fields.Telegram_User_ID;
  if (telegramUserId) {
    try {
      await removeMemberFromGroup(telegramUserId);
      removedFromGroup = true;
    } catch (e) {
      error = `group removal failed: ${e instanceof Error ? e.message : e}`;
      console.error("[membership] removeMemberFromGroup:", e);
    }
  }

  try {
    await updateDriverRecord(driver.id, { Membership_Status: "Expired" });
  } catch (e) {
    error = `${error ? error + "; " : ""}airtable expire update failed: ${e instanceof Error ? e.message : e}`;
    console.error("[membership] updateDriverRecord:", e);
  }

  return { removedFromGroup, error };
}
