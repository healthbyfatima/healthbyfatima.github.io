// Cloudflare Worker: receives contact-form submissions from the site and forwards them
// to the "Health by Fatima — Müraciətlər" Telegram group. The bot token lives only here
// (secret BOT_TOKEN), never in the static site.

const KIND_TITLE = {
  A: '🩺 Həkim — media və tanıtım paketi',
  pkg: '📦 Paket üçün müraciət',
  B: '🤝 Sponsorluq və tərəfdaşlıq'
};

// Field order and Azerbaijani labels for the Telegram message.
const LABELS = [
  ['name', 'Ad soyad'],
  ['specialty', 'İxtisas / vəzifə'],
  ['workplace', 'İş yeri'],
  ['social', 'Instagram / LinkedIn'],
  ['topic', 'Təklif olunan mövzu'],
  ['interest', 'Maraq'],
  ['company', 'Şirkət'],
  ['brand', 'Brend'],
  ['person', 'Əlaqələndirici şəxs'],
  ['position', 'Vəzifə'],
  ['type', 'Əməkdaşlıq növü'],
  ['budget', 'Büdcə aralığı'],
  ['offer', 'Təklif'],
  ['phone', 'Telefon'],
  ['email', 'E-poçt']
];

const INTEREST = { p500: 'Podcast paketi', p800: 'Podcast + Doctor Spotlight' };

const MAX_BODY = 10_000;
const MAX_FIELD = 1500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map(); // best-effort, per isolate

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function cors(origin, env) {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_MAX;
}

function buildMessage(kind, data, page) {
  const lines = [`<b>${KIND_TITLE[kind]}</b>`, ''];
  for (const [key, label] of LABELS) {
    let v = String(data[key] ?? '').trim().slice(0, MAX_FIELD);
    if (!v) continue;
    if (key === 'interest') v = INTEREST[v] ?? v;
    lines.push(`<b>${label}:</b> ${esc(v)}`);
  }
  if (page) lines.push('', `<i>Səhifə: ${esc(String(page).slice(0, 200))}</i>`);
  return lines.join('\n');
}

async function sendTelegram(env, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true })
  });
  return res.json();
}

export default {
  async fetch(request, env) {
    const headers = cors(request.headers.get('Origin') ?? '', env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return json({ ok: false }, 405, headers);

    const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
    if (!allowed.includes(request.headers.get('Origin') ?? '')) return json({ ok: false }, 403, headers);

    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ ok: false }, 413, headers);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ ok: false }, 400, headers);
    }
    const { kind, data = {}, page } = body ?? {};
    if (!KIND_TITLE[kind] || typeof data !== 'object') return json({ ok: false }, 400, headers);
    if (data.website) return json({ ok: true }, 200, headers); // honeypot: pretend success

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (rateLimited(ip)) return json({ ok: false }, 429, headers);

    const text = buildMessage(kind, data, page);
    let res = await sendTelegram(env, env.CHAT_ID, text);
    // A group upgraded to a supergroup gets a new id — retry once with it.
    const migrated = res?.parameters?.migrate_to_chat_id;
    if (!res.ok && migrated) {
      console.log(`CHAT_ID migrated to ${migrated} — update wrangler.toml`);
      res = await sendTelegram(env, migrated, text);
    }
    if (!res.ok) console.log('Telegram error', JSON.stringify(res));
    return json({ ok: !!res.ok }, res.ok ? 200 : 502, headers);
  }
};
