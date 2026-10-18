import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES, SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { episodeCard, latestEpisodes, TOPICS } from '@/lib/content';
import { InstagramIcon, YoutubeIcon } from '@/components/icons/Social';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EpisodeBrowser } from '@/components/episodes/EpisodeBrowser';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.episodes, title: t('episodesTitle'), description: t('episodesDescription') });
}

export default async function EpisodesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Episodes');
  const tt = await getTranslations('Topics');

  const list = latestEpisodes(Infinity).map((ep) => episodeCard(ep, (k) => tt(k)));
  // Only topics that have episodes get a filter chip.
  const topics = TOPICS.filter((k) => list.some((e) => e.topicKey === k)).map((k) => ({ key: k, label: tt(k) }));

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1000, height: 800, left: -300, top: -380 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="row g24" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div className="stack g20" style={{ maxWidth: 820 }}>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="h1">{t('title')}</h1>
              <p className="lead">{t('lead')}</p>
            </div>
            <div className="row g12">
              <ButtonLink href={SITE.youtube} variant="ghost" fit>
                <YoutubeIcon className="ic" />@FatimaNuriyeva1
              </ButtonLink>
              <ButtonLink href={SITE.instagram} variant="ghost" fit>
                <InstagramIcon className="ic" />
                {SITE.instagramHandle}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 8 }}>
        <div className="wrap stack g32">
          <EpisodeBrowser episodes={list} topics={topics} />
          <div className="row" style={{ justifyContent: 'center' }}>
            <ButtonLink href={SITE.youtube} variant="ghost" fit>
              {t('youtubeAll')}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
