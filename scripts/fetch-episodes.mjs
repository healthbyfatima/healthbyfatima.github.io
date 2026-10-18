// Pulls the latest videos from the YouTube RSS feed (no API key) into content/episodes.json.
// - Shorts are skipped; only full episodes are kept.
// - Existing entries are kept (the feed only lists the last 15 items), so the archive grows over time.
// - Hand-filled fields (topics, guestSlug) are never overwritten.
// - If the feed is unreachable the file is left as is and the build continues.
import fs from 'node:fs';

const CHANNEL_ID = 'UCUbsKSxN1xFBFmHVNNX1P1A'; // @FatimaNuriyeva1
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const FILE = new URL('../content/episodes.json', import.meta.url);

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const pick = (xml, re) => xml.match(re)?.[1] ?? '';

let xml;
try {
  const res = await fetch(FEED, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  xml = await res.text();
} catch (err) {
  console.warn(`[episodes] feed unavailable (${err.message}) — keeping content/episodes.json`);
  process.exit(0);
}

const fromFeed = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
  .map(([, e]) => ({
    youtubeId: pick(e, /<yt:videoId>([^<]+)<\/yt:videoId>/),
    title: decode(pick(e, /<title>([^<]*)<\/title>/)),
    link: pick(e, /<link rel="alternate" href="([^"]+)"/),
    date: pick(e, /<published>([^<]+)<\/published>/)
  }))
  .filter((e) => e.youtubeId && !e.link.includes('/shorts/'));

const existing = JSON.parse(fs.readFileSync(FILE, 'utf8')).filter((e) => e.youtubeId);
const byId = new Map(existing.map((e) => [e.youtubeId, e]));
for (const { link, ...e } of fromFeed) {
  const old = byId.get(e.youtubeId);
  byId.set(e.youtubeId, { ...e, guestSlug: old?.guestSlug ?? '', topics: old?.topics ?? [] });
}

const list = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + '\n');
console.log(`[episodes] ${list.length} episodes (${fromFeed.length} full videos in feed)`);
