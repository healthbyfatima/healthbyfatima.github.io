import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Handshake, MessageCircle, Mic, Video } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { LOGO, ROUTES, SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { guestBySlug, guests, latestEpisodes, loc, specialties, TOPICS } from '@/lib/content';
import { YoutubeIcon } from '@/components/icons/Social';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/Section';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { GuestCard } from '@/components/ui/GuestCard';
import { PathCard } from '@/components/ui/PathCard';
import { Marquee, Orbit, Shield, Tree, VerticalCarousel } from '@/components/home/BentoVisuals';

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
  const tg = await getTranslations('GuestCategory');
  const tp = await getTranslations('Placeholder');
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');

  const topics = TOPICS.map((k) => tt(k));

  const episodes = latestEpisodes(3).map((ep) => {
    const g = guestBySlug(ep.guestSlug);
    return {
      youtubeId: ep.youtubeId,
      title: ep.title || tp('episodeTitle'),
      meta: `${g?.name || tp('name')} · ${g?.title || tp('titleShort')}`,
      topic: tt(ep.topics[0] ?? 'clinical'),
      sponsored: ep.sponsored
    };
  });

  // Desktop shows 8, phone shows 4 (.home-guests hides the rest).
  const homeGuests = guests.slice(0, 8).map((g) => ({
    name: g.name || tp('name'),
    title: g.title || tp('title'),
    organization: g.organization || tp('organization'),
    category: tg(g.category),
    photo: g.photo || undefined,
    href: `${ROUTES.episodes}?qonaq=${g.slug}`
  }));

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
              <ButtonLink href={ROUTES.episodes} variant="primary">
                <YoutubeIcon className="ic" />
                {t('watch')}
              </ButtonLink>
              <ButtonLink href={ROUTES.contact}>
                {tc('cta')}
                <ArrowRight className="ic sm" aria-hidden />
              </ButtonLink>
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
      <section className="section tight" aria-labelledby="latest-h">
        <div className="wrap">
          <SectionHead id="latest-h" eyebrow={t('latestEyebrow')} title={t('latestTitle')} action={<ArrowLink href={ROUTES.episodes}>{tc('all')}</ArrowLink>} />
          <div className="grid-3">
            {episodes.map((ep, i) => (
              <EpisodeCard key={ep.youtubeId || i} episode={ep} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Söhbətlərimiz — bento */}
      <section className="section" aria-labelledby="bento-h">
        <div className="wrap">
          <SectionHead id="bento-h" eyebrow={t('bentoEyebrow')} title={t('bentoTitle')} />
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
        </div>
      </section>

      {/* 4 · Qonaqlar */}
      <section className="section tight" aria-labelledby="guests-h">
        <div className="wrap">
          <SectionHead id="guests-h" eyebrow={t('guestsEyebrow')} title={t('guestsTitle')} action={<ArrowLink href={ROUTES.guests}>{t('guestsAll')}</ArrowLink>} />
          <div className="grid-4 keep2 home-guests">
            {homeGuests.map((g, i) => (
              <GuestCard key={i} guest={g} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Əməkdaşlıq */}
      <section className="section" aria-labelledby="collab-h">
        <div className="wrap">
          <SectionHead
            id="collab-h"
            eyebrow={t('collabEyebrow')}
            title={t('collabTitle')}
            action={<ArrowLink href={ROUTES.partnerships}>{t('collabLink')}</ArrowLink>}
          />
          <div className="grid-3">
            <PathCard
              href={ROUTES.beGuest}
              num="01"
              icon={<IconCircle><Mic className="ic" aria-hidden /></IconCircle>}
              title={tn('beGuest')}
              text={t('pathGuestText')}
              cta={t('pathGuestCta')}
            />
            <PathCard
              href={ROUTES.packages}
              num="02"
              icon={<IconCircle><Video className="ic" aria-hidden /></IconCircle>}
              title={tn('packages')}
              text={t('pathPackagesText')}
              cta={t('pathPackagesCta')}
            />
            <PathCard
              href={ROUTES.brand}
              num="03"
              icon={<IconCircle><Handshake className="ic" aria-hidden /></IconCircle>}
              title={tn('brand')}
              text={t('pathBrandText')}
              cta={t('pathBrandCta')}
            />
          </div>
        </div>
      </section>

      {/* 6 · Qurucu */}
      <section className="section tight" aria-labelledby="founder-h">
        <div className="wrap">
          <div className="grid-2 gap-halves" style={{ ['--gap-halves' as string]: '64px', alignItems: 'center' }}>
            <div className="photo-frame" style={{ ['--photo-ratio' as string]: '4 / 5', maxWidth: 520 }}>
              <Image src="/photos/fatima-portrait.webp" alt={tc('founderAlt')} fill sizes="(min-width: 768px) 520px, 100vw" />
            </div>
            <div className="stack g20">
              <Eyebrow>{t('founderEyebrow')}</Eyebrow>
              <h2 id="founder-h" className="h2">
                {t('founderName')}
              </h2>
              <p className="italic muted" style={{ fontSize: 17 }} lang="en">
                {t('founderRole')}
              </p>
              <p className="body">{t('founderBio')}</p>
              <ul className="filters" style={{ listStyle: 'none', padding: 0, margin: '4px 0 0' }}>
                <li className="chip chip-static">{t('founderChip1')}</li>
                <li className="chip chip-static">{t('founderChip2')}</li>
                <li className="chip chip-static">{t('founderChip3')}</li>
              </ul>
              <div style={{ marginTop: 8 }}>
                <ArrowLink href={ROUTES.about}>{tc('more')}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · CTA */}
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
