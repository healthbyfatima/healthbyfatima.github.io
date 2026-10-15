import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { SITE } from './site';

const OG_LOCALE: Record<Locale, string> = { az: 'az_AZ', en: 'en_US', ru: 'ru_RU' };

/** Per-page metadata with canonical + hreflang alternates for all three locales. */
export function pageMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const suffix = path === '/' ? '' : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${suffix}`;
  languages['x-default'] = `/${routing.defaultLocale}${suffix}`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${suffix}`, languages },
    openGraph: {
      title: title ?? SITE.name,
      description,
      url: `/${locale}${suffix}`,
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      type: 'website'
    }
  };
}
