import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '@/i18n/routing';
import episodesJson from '@/content/episodes.json';
import guestsJson from '@/content/guests.json';
import specialtiesJson from '@/content/specialties.json';
import packagesJson from '@/content/packages.json';
import partnershipJson from '@/content/partnership.json';

/** Text stored in content/*.json in all three languages. */
export type L10n = Record<Locale, string>;
export const loc = (v: L10n, locale: Locale) => v[locale] ?? v.az;

// Topic keys — labels live in messages/*.json under "Topics".
export const TOPICS = ['clinical', 'management', 'finance', 'policy', 'tech', 'wellness'] as const;
export type Topic = (typeof TOPICS)[number];

export const GUEST_CATEGORIES = ['doctor', 'surgeon', 'leader', 'researcher', 'expert'] as const;
export type GuestCategory = (typeof GUEST_CATEGORIES)[number];

export type Episode = {
  youtubeId: string;
  title: string;
  guestSlug: string;
  topics: Topic[];
  /** ISO date from the YouTube feed. Filled by scripts/fetch-episodes.mjs. */
  date: string;
};

export type Guest = {
  slug: string;
  /** Empty strings render as "[Ad Soyad]" style placeholders — never invent names. */
  name: string;
  title: string;
  organization: string;
  category: GuestCategory;
  photo: string;
  episodeIds: string[];
};

export const episodes = episodesJson as Episode[];
export const guests = guestsJson as Guest[];
export const specialties = specialtiesJson as L10n[][];
export const packages = packagesJson;
export const partnership = partnershipJson;

export function latestEpisodes(n: number) {
  return [...episodes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

export const guestBySlug = (slug: string) => guests.find((g) => g.slug === slug);

/** EpisodeCard data; the guest line and topic chip appear only once they are filled in content/episodes.json. */
export function episodeCard(ep: Episode, topicLabel: (t: Topic) => string) {
  const g = guestBySlug(ep.guestSlug);
  const topic = ep.topics[0];
  return {
    youtubeId: ep.youtubeId,
    title: ep.title,
    meta: g ? [g.name, g.title].filter(Boolean).join(' · ') : '',
    topic: topic ? topicLabel(topic) : undefined,
    topicKey: topic ?? ''
  };
}

/** True when the file exists under public/ — used for partner logos that may be added later. */
export function publicFileExists(src: string) {
  return src !== '' && fs.existsSync(path.join(process.cwd(), 'public', src));
}
