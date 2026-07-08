// Telegram Bot API helpers for CashRides ATL membership management.
// Server-side only — uses the @CashRidesATL_bot token.

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GROUP_ID = process.env.TELEGRAM_GROUP_ID || "-1003739000161";

const API = () => `https://api.telegram.org/bot${BOT_TOKEN}`;

async function tg<T>(method: string, params: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Telegram ${method} failed: ${data.error_code} ${data.description}`);
  }
  return data.result as T;
}

/**
 * Create a single-use invite link to the community group for a paid member.
 * member_limit=1 means the link dies after one person uses it, so it can be
 * safely delivered by email. The name ties the link back to the Airtable record.
 */
export async function createMemberInviteLink(recordId: string): Promise<string> {
  const result = await tg<{ invite_link: string }>("createChatInviteLink", {
    chat_id: GROUP_ID,
    // Telegram caps invite link names at 32 chars
    name: `member:${recordId}`.slice(0, 32),
    member_limit: 1,
  });
  return result.invite_link;
}

/**
 * Remove a user from the group without permanently banning them — ban then
 * immediately unban, so they can rejoin with a fresh invite if they resubscribe.
 */
export async function removeMemberFromGroup(telegramUserId: string | number): Promise<void> {
  await tg("banChatMember", { chat_id: GROUP_ID, user_id: Number(telegramUserId) });
  await tg("unbanChatMember", {
    chat_id: GROUP_ID,
    user_id: Number(telegramUserId),
    only_if_banned: true,
  });
}

/** Revoke an invite link (e.g. cleanup of unused links after cancellation). */
export async function revokeInviteLink(inviteLink: string): Promise<void> {
  await tg("revokeChatInviteLink", { chat_id: GROUP_ID, invite_link: inviteLink });
}
