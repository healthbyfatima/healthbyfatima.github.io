/** Forms do nothing on submit until e-mail + Telegram delivery is connected. */
export const FORMS_ENABLED = false;

export type FormKind = 'A' | 'pkg' | 'B';

/**
 * Placeholder sender — the forms are UI-only for now.
 * Stage 3 replaces this with the real delivery (Resend or an external form
 * service, depending on the hosting decision) plus the honeypot / rate limit
 * check on the server.
 */
export async function submitContact(_kind: FormKind, _data: Record<string, string>): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true };
}
