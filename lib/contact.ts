/** Forms post to the Cloudflare Worker in worker/, which forwards them to the Telegram group. */
export const FORMS_ENABLED = true;

const FORMS_URL = 'https://hbf-forms.yasharimamaliyev.workers.dev';

export type FormKind = 'A' | 'pkg' | 'B';

export async function submitContact(kind: FormKind, data: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, data, page: location.pathname })
    });
    const json = await res.json().catch(() => ({ ok: false }));
    return { ok: res.ok && !!json.ok };
  } catch {
    return { ok: false };
  }
}
