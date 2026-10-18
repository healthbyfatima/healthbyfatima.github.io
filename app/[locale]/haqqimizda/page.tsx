import type { Metadata } from 'next';
import Image from 'next/image';
import { HeartHandshake, Mic, Stethoscope } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FounderBlock } from '@/components/ui/FounderBlock';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.about, title: t('aboutTitle'), description: t('aboutDescription') });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  const cards = [
    { icon: Mic, title: t('mediaTitle'), text: t('mediaText') },
    { icon: Stethoscope, title: t('expertTitle'), text: t('expertText') },
    { icon: HeartHandshake, title: t('partnerTitle'), text: t('partnerText') }
  ];

  return (
    <>
      <section className="wide-hero">
        <Image src="/photos/fatima-wide.webp" alt={t('heroAlt')} width={2400} height={1200} sizes="100vw" priority />
        <div className="over">
          <div className="wrap stack g16">
            <Eyebrow className="text-text">{t('eyebrow')}</Eyebrow>
            <h1 className="h1" style={{ maxWidth: 900 }}>
              {t('title')}
            </h1>
            <p className="lead" style={{ color: 'var(--text)', maxWidth: 720 }}>
              {t('sub')}
            </p>
          </div>
        </div>
      </section>

      {/* Layihə */}
      <section className="section" aria-labelledby="project-h">
        <div className="wrap">
          <div className="grid-2 gap-halves" style={{ ['--gap-halves' as string]: '64px' }}>
            <div className="stack g20">
              <Eyebrow>{t('projectEyebrow')}</Eyebrow>
              <h2 id="project-h" className="h2">
                {t('projectTitle')}
              </h2>
            </div>
            <div className="stack g20">
              <p className="lead">{t('projectText')}</p>
              <div className="card card-blue" style={{ padding: 28 }}>
                <CardGlow style={{ right: -220, top: -260 }} />
                <p className="tiny" style={{ color: 'var(--text)', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>
                  {t('missionLabel')}
                </p>
                <p style={{ marginTop: 10, fontSize: 20, lineHeight: 1.5, fontWeight: 600 }}>{t('missionText')}</p>
              </div>
            </div>
          </div>
          <div className="grid-3" style={{ marginTop: 48 }}>
            {cards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card">
                <IconCircle primary>
                  <Icon className="ic" aria-hidden />
                </IconCircle>
                <h3 className="card-title" style={{ marginTop: 24 }}>
                  {title}
                </h3>
                <p className="card-text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Qurucu */}
      <section className="section tight" aria-labelledby="founder-h">
        <div className="wrap">
          <FounderBlock />
        </div>
      </section>
    </>
  );
}
