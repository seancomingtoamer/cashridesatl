// AgentMail sender for CashRides ATL transactional email (group invites).
// Mirrors the working Python integration on the droplet: the message body
// field is `text` — NOT `body` (known AgentMail API gotcha).

const AGENTMAIL_API_KEY = process.env.AGENTMAIL_API_KEY!;
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX || "cashridesatl@agentmail.to";

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(AGENTMAIL_INBOX)}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AGENTMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    }
  );
  if (!res.ok) {
    throw new Error(`AgentMail send failed: ${res.status} ${await res.text()}`);
  }
}
