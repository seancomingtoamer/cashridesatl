import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  findDriversByEmail,
  findDriverByStripeCustomerId,
  pickBestDriverRecord,
  createDriverProfile,
  updateDriverRecord,
} from "@/lib/airtable";
import { grantMembership, revokeMembership } from "@/lib/membership";

// Stripe webhooks must never be cached and always run dynamically.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NOTIFY_WEBHOOK =
  process.env.CASHRIDES_DRIVER_WEBHOOK ||
  "https://seanpro.app.n8n.cloud/webhook/cashrides-driver";

const AIRTABLE_BASE_URL = "https://airtable.com/appfs1MJL9BzZrpOx";

// Lazily init Stripe so a missing STRIPE_SECRET_KEY doesn't crash the module.
// We only need a Stripe instance for signature verification — constructEvent
// does not make any API calls, so a dummy secret is fine. We use the webhook
// secret itself only inside constructEvent.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_dummy_not_used", {
  // Pin the API version to avoid silent breakage when Stripe rolls forward.
  apiVersion: "2026-03-25.dahlia",
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

type NotifyPayload = Record<string, string | number | boolean | null | undefined>;

async function notifySean(source: string, payload: NotifyPayload) {
  try {
    const res = await fetch(NOTIFY_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, ...payload }),
    });
    if (!res.ok) {
      console.error("[stripe-webhook notify] non-OK:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[stripe-webhook notify] failed:", e);
  }
}

function reviewUrl(recordId: string) {
  return `${AIRTABLE_BASE_URL}/${recordId}`;
}

function dollars(cents: number | null | undefined) {
  if (cents == null) return "";
  return `$${(cents / 100).toFixed(2)}`;
}

function isoDate(unix: number | null | undefined) {
  if (!unix) return "";
  return new Date(unix * 1000).toISOString();
}

/**
 * Build the admin note line we append for a payment event.
 * Format is machine-greppable: the subscription ID and customer ID both appear
 * verbatim so future webhook deliveries can detect idempotency via text search.
 */
function buildPaymentNote(params: {
  subscriptionId: string;
  customerId: string;
  amount: string;
  ts: string;
}) {
  return `[STRIPE ${params.ts}] Spotlight subscription ${params.subscriptionId} (customer ${params.customerId}) — ${params.amount}/mo. Flipped Spotlight=true via webhook.`;
}

function buildCancelNote(params: {
  subscriptionId: string;
  customerId: string;
  ts: string;
}) {
  return `[STRIPE ${params.ts}] Spotlight cancelled (subscription ${params.subscriptionId}, customer ${params.customerId}). Flipped Spotlight=false via webhook.`;
}

function appendAdminNotes(existing: string | undefined, line: string) {
  if (!existing) return line;
  return `${existing}\n${line}`;
}

/**
 * Handle checkout.session.completed. This is the canonical "new paid customer"
 * event for subscription Payment Links — it fires once the checkout completes,
 * contains the customer email, customer ID, and the new subscription ID.
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") {
    // We only care about subscription mode for the Spotlight link; one-time
    // payments can be ignored. Still return 200 so Stripe stops retrying.
    return { ok: true, skipped: "non-subscription session" };
  }

  const email =
    session.customer_details?.email?.toLowerCase().trim() ||
    session.customer_email?.toLowerCase().trim() ||
    "";
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id || "";
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id || "";
  const amount = dollars(session.amount_total);
  const name = session.customer_details?.name || "";
  const phone = session.customer_details?.phone || "";
  const ts = isoDate(session.created);

  if (!email || !customerId || !subscriptionId) {
    console.error("[stripe-webhook] missing critical fields on session", {
      email,
      customerId,
      subscriptionId,
    });
    return { ok: false, error: "missing fields" };
  }

  // Look up matching drivers in Airtable.
  const matches = await findDriversByEmail(email);

  // Idempotency: if ANY matching record already has this subscription ID in
  // Admin_Notes, this event is a replay — skip the mutation and the notification.
  const alreadyApplied = matches.find((r) =>
    (r.fields.Admin_Notes || "").includes(subscriptionId)
  );
  if (alreadyApplied) {
    console.log(
      `[stripe-webhook] subscription ${subscriptionId} already recorded on ${alreadyApplied.id}, skipping`
    );
    return { ok: true, skipped: "idempotent" };
  }

  const note = buildPaymentNote({ subscriptionId, customerId, amount, ts });

  if (matches.length === 0) {
    // NEW PAID CUSTOMER, no Airtable record yet — create one with
    // "Paid, awaiting verification" status so Sean can chase docs.
    const created = await createDriverProfile({
      Name: name || email,
      Email: email,
      Phone: phone,
      Spotlight: true,
      Published: false,
      Admin_Notes: `PAID via Stripe — awaiting verification docs. Source: Payment Link (no prior record). ${note}`,
    });

    const grant = await grantMembership({
      recordId: created.id,
      email,
      name: name || email,
      customerId,
    });

    await notifySean("stripe-paid-unknown", {
      airtable_id: created.id,
      review_url: reviewUrl(created.id),
      email,
      name,
      phone,
      amount,
      subscription_id: subscriptionId,
      customer_id: customerId,
      invite_link: grant.inviteLink,
      invite_email_sent: grant.emailSent,
      membership_error: grant.error,
      message: `New driver membership from ${email} — no existing driver record. Created new row.${grant.emailSent ? " Group invite emailed automatically." : ` INVITE EMAIL NOT SENT (${grant.error || "unknown"}) — send manually: ${grant.inviteLink || "link creation failed too"}.`} Chase for verification docs.`,
    });

    return { ok: true, action: "created-new", airtableId: created.id };
  }

  // One or more matches exist. Pick the most complete record.
  const best = pickBestDriverRecord(matches)!;
  const duplicates = matches.filter((r) => r.id !== best.id);

  if (duplicates.length > 0) {
    console.warn(
      `[stripe-webhook] ${matches.length} duplicate driver records for ${email}; updating ${best.id}, leaving alone: ${duplicates
        .map((r) => r.id)
        .join(", ")}`
    );
  }

  await updateDriverRecord(best.id, {
    Spotlight: true,
    Admin_Notes: appendAdminNotes(best.fields.Admin_Notes, note),
  });

  const grant = await grantMembership({
    recordId: best.id,
    email,
    name: best.fields.Name || name || email,
    customerId,
  });

  await notifySean("stripe-paid-matched", {
    airtable_id: best.id,
    review_url: reviewUrl(best.id),
    email,
    name: best.fields.Name || name,
    amount,
    subscription_id: subscriptionId,
    customer_id: customerId,
    duplicate_count: duplicates.length,
    duplicate_ids: duplicates.map((r) => r.id).join(", "),
    invite_link: grant.inviteLink,
    invite_email_sent: grant.emailSent,
    membership_error: grant.error,
    message: `Driver membership confirmed for ${best.fields.Name || email}.${grant.emailSent ? " Group invite emailed automatically." : ` INVITE EMAIL NOT SENT (${grant.error || "unknown"}) — send manually: ${grant.inviteLink || "link creation failed too"}.`}${duplicates.length > 0 ? ` WARNING: ${duplicates.length} duplicate row(s) in base — review manually.` : ""}`,
  });

  return { ok: true, action: "updated", airtableId: best.id };
}

/**
 * Handle customer.subscription.deleted. Fires when a subscription ends
 * (user-initiated cancel, end-of-billing-period, or admin cancel).
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  const subscriptionId = subscription.id;
  const ts = isoDate(subscription.canceled_at || subscription.ended_at || subscription.created);

  // Find the driver record whose Admin_Notes already contains this customer ID.
  // This avoids any Stripe API round-trip to resolve the email.
  const driver = await findDriverByStripeCustomerId(customerId);

  if (!driver) {
    console.warn(
      `[stripe-webhook] subscription.deleted for unknown customer ${customerId}`
    );
    await notifySean("stripe-cancel-unknown", {
      customer_id: customerId,
      subscription_id: subscriptionId,
      message: `Subscription cancelled for customer ${customerId} but no matching Airtable record was found. Investigate manually.`,
    });
    return { ok: true, action: "unknown-customer" };
  }

  // Idempotency: if the cancellation line is already in notes, skip.
  if ((driver.fields.Admin_Notes || "").includes(`Spotlight cancelled (subscription ${subscriptionId}`)) {
    console.log(
      `[stripe-webhook] cancellation of ${subscriptionId} already recorded on ${driver.id}, skipping`
    );
    return { ok: true, skipped: "idempotent" };
  }

  const note = buildCancelNote({ subscriptionId, customerId, ts });

  await updateDriverRecord(driver.id, {
    Spotlight: false,
    Admin_Notes: appendAdminNotes(driver.fields.Admin_Notes, note),
  });

  const revoke = await revokeMembership(driver);

  await notifySean("stripe-cancelled", {
    airtable_id: driver.id,
    review_url: reviewUrl(driver.id),
    email: driver.fields.Email || "",
    name: driver.fields.Name || "",
    subscription_id: subscriptionId,
    customer_id: customerId,
    removed_from_group: revoke.removedFromGroup,
    membership_error: revoke.error,
    message: `Membership CANCELLED for ${driver.fields.Name || driver.fields.Email || driver.id}. Spotlight off, membership Expired.${revoke.removedFromGroup ? " Removed from the Telegram group automatically." : driver.fields.Telegram_User_ID ? ` Group removal FAILED (${revoke.error || "unknown"}) — remove manually.` : " No Telegram ID on file — remove from the group manually if they're in it."} Follow up to understand why.`,
  });

  return { ok: true, action: "cancelled", airtableId: driver.id };
}

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  // IMPORTANT: read the raw body for signature verification. Do NOT use req.json().
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[stripe-webhook] signature verification failed:", message);
    return NextResponse.json({ error: `Signature verification failed: ${message}` }, { status: 400 });
  }

  console.log(`[stripe-webhook] received ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const result = await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        return NextResponse.json({ received: true, ...result });
      }
      case "customer.subscription.deleted": {
        const result = await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        return NextResponse.json({ received: true, ...result });
      }
      default:
        // Return 200 for unhandled events so Stripe stops retrying.
        console.log(`[stripe-webhook] ignoring event type ${event.type}`);
        return NextResponse.json({ received: true, ignored: event.type });
    }
  } catch (err) {
    // Return 500 so Stripe retries — but log the full error for debugging.
    // Note: retries only help transient Airtable/notify failures; schema errors will loop.
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[stripe-webhook] handler error for ${event.type}:`, message, err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
