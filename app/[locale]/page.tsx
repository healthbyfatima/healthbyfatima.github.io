import type { Metadata } from 'next';
import Image from 'next/image';
import { Handshake, MessageCircle, Video } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { LOGO, ROUTES, SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { episodeCard, latestEpisodes, loc, specialties, TOPICS } from '@/lib/content';
import { YoutubeIcon } from '@/components/icons/Social';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FounderBlock } from '@/components/ui/FounderBlock';
import { SectionHead } from '@/components/ui/Section';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { PathCard } from '@/components/ui/PathCard';
import { BentoMotion, Marquee, Orbit, Shield, Tree, VerticalCarousel } from '@/components/home/BentoVisuals';
import { CollabMenu } from '@/components/home/CollabMenu';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: '/', title: t('siteTitle'), description: t('siteDescription') });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const tt = await getTranslations('Topics');
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');

  const topics = TOPICS.map((k) => tt(k));

  const episodes = latestEpisodes(3).map((ep) => episodeCard(ep, (k) => tt(k)));

  return (
    <>
      {/* 1 · Hero */}
      <section className="hero" aria-labelledby="hero-h1">
        <div className="hero-rings" aria-hidden>
          <span style={{ width: '100%', height: '100%' }} />
          <span style={{ width: '76%', height: '76%' }} />
          <span style={{ width: '52%', height: '52%' }} />
        </div>
        <div className="bg-glow" style={{ width: 1100, height: 900, left: '50%', top: -260, marginLeft: -550 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <Image className="hero-logo" src={LOGO.src} alt={tc('logoAlt')} width={LOGO.width} height={LOGO.height} priority />
          <div className="stack g16" style={{ alignItems: 'center' }}>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <p className="italic muted" style={{ fontSize: 17 }} lang="en">
              {t('tagline')}
            </p>
            <h1 id="hero-h1" className="h1" style={{ maxWidth: 900 }}>
              {t('title')}
            </h1>
            <p className="lead" style={{ maxWidth: 720 }}>
              {t('text')}
            </p>
            <div className="row g12" style={{ justifyContent: 'center', marginTop: 16, width: '100%' }}>
              <ButtonLink href="#latest" variant="primary">
                <YoutubeIcon className="ic" />
                {t('watch')}
              </ButtonLink>
              <CollabMenu />
            </div>
          </div>
          <div className="topics-line" lang="en">
            <span>Medicine</span>
            <i>·</i>
            <span>Healthcare Leadership</span>
            <i>·</i>
            <span>Innovation</span>
            <i>·</i>
            <span>Policy</span>
          </div>
        </div>
      </section>

      {/* 2 · Son buraxılışlar */}
      <section className="section tight" id="latest" aria-labelledby="latest-h">
        <div className="wrap">
          <SectionHead id="latest-h" eyebrow={t('latestEyebrow')} title={t('latestTitle')} action={<ArrowLink href={ROUTES.episodes}>{tc('all')}</ArrowLink>} />
          <div className="grid-3">
            {episodes.map((ep, i) => (
              <EpisodeCard key={ep.youtubeId || i} episode={ep} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Söhbətlərimiz — bento */}
      <section className="section" aria-labelledby="bento-h">
        <div className="wrap">
          <SectionHead id="bento-h" eyebrow={t('bentoEyebrow')} title={t('bentoTitle')} />
          <BentoMotion>
          <div className="bento-cols">
            <div className="bento-col">
              <article className="card bcard">
                <CardGlow style={{ right: -160, bottom: -200 }} />
                <h3 className="card-title">{t.rich('orbitTitle', { br: () => <br /> })}</h3>
                <p className="card-text" style={{ maxWidth: 440 }}>
                  {t('orbitText')}
                </p>
                <Orbit youtube={t('orbitYoutube')} reels="Reels" stories="Stories" collab={t('orbitCollab')} backstage="Backstage" />
              </article>
              <article className="card card-blue bcard">
                <VerticalCarousel topics={topics} />
                <div style={{ marginTop: 56 }}>
                  <h3 className="card-title">{t('topicsTitle')}</h3>
                  <p className="card-text">{t('topicsText')}</p>
                  <ul className="filters" style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                    {topics.map((topic) => (
                      <li key={topic} className="chip chip-sm chip-static">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
            <div className="bento-col">
              <article className="card card-blue bcard">
                <Marquee rows={specialties.map((row) => row.map((s) => loc(s, locale)))} />
                <div style={{ marginTop: 36 }}>
                  <h3 className="card-title">{t('guestsCardTitle')}</h3>
                  <p className="card-text">{t('guestsCardText')}</p>
                </div>
              </article>
              <article className="card bcard">
                <CardGlow style={{ left: '50%', marginLeft: -230, top: 120 }} />
                <h3 className="card-title">{t('treeTitle')}</h3>
                <p className="card-text">{t('treeText')}</p>
                <Tree top={t('treeTop')} leaves={['YouTube', 'Instagram', 'Reels', 'Stories']} />
              </article>
              <article className="card bcard" style={{ padding: 0 }}>
                <div className="grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
                  <Shield />
                  <div className="stack pad-md" style={{ justifyContent: 'center' }}>
                    <h3 className="card-title">{t('shieldTitle')}</h3>
                    <p className="card-text">{t('shieldText')}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          </BentoMotion>
        </div>
      </section>

      {/* 4 · Əməkdaşlıq */}
      <section className="section" aria-labelledby="collab-h">
        <div className="wrap">
          <SectionHead
            id="collab-h"
            eyebrow={t('collabEyebrow')}
            title={t('collabTitle')}
            action={<ArrowLink href={ROUTES.partnerships}>{t('collabLink')}</ArrowLink>}
          />
          <div className="grid-2">
            <PathCard
              href={ROUTES.packages}
              num="01"
              icon={<IconCircle><Video className="ic" aria-hidden /></IconCircle>}
              title={tn('packages')}
              text={t('pathPackagesText')}
              cta={t('pathPackagesCta')}
            />
            <PathCard
              href={ROUTES.brand}
              num="02"
              icon={<IconCircle><Handshake className="ic" aria-hidden /></IconCircle>}
              title={tn('brand')}
              text={t('pathBrandText')}
              cta={t('pathBrandCta')}
            />
          </div>
        </div>
      </section>

      {/* 5 · Qurucu */}
      <section className="section tight" aria-labelledby="founder-h">
        <div className="wrap">
          <FounderBlock moreHref={ROUTES.about} />
        </div>
      </section>

      {/* 6 · CTA */}
      <section className="section" aria-labelledby="cta-h">
        <div className="wrap">
          <div className="card card-blue pad-cta" style={{ textAlign: 'center' }}>
            <CardGlow style={{ left: '50%', marginLeft: -230, top: -240 }} />
            <div className="stack g20" style={{ alignItems: 'center' }}>
              <Eyebrow className="text-text">{t('ctaEyebrow')}</Eyebrow>
              <h2 id="cta-h" className="h2" style={{ maxWidth: 760 }}>
                {t('ctaTitle')}
              </h2>
              <p className="lead" style={{ maxWidth: 640, color: 'var(--text)' }}>
                {t('ctaText')}
              </p>
              <div className="row g12" style={{ justifyContent: 'center', marginTop: 8, width: '100%' }}>
                <ButtonLink href={ROUTES.contact}>{tc('cta')}</ButtonLink>
                <ButtonLink href={SITE.whatsapp} variant="ghost">
                  <MessageCircle className="ic" aria-hidden />
                  {tc('whatsapp')}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
