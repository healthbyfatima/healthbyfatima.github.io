import type { Metadata } from 'next';
import Image from 'next/image';
import { GraduationCap, HeartPulse, Hospital, Leaf, Shirt, Sparkles, type LucideIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { loc, partnership, publicFileExists } from '@/lib/content';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Crumbs } from '@/components/ui/Crumbs';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';

type Props = { params: Promise<{ locale: Locale }> };

const CATEGORY_ICONS: Record<string, LucideIcon> = { hospital: Hospital, pulse: HeartPulse, leaf: Leaf, education: GraduationCap, sparkles: Sparkles, shirt: Shirt };
// Bento layout of the five directions: two wide cards, then three; 1st and 5th are blue.
const DIRECTION_LAYOUT = [
  { span: 's6', blue: true },
  { span: 's6', blue: false },
  { span: 's4', blue: false },
  { span: 's4', blue: false },
  { span: 's4', blue: true }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.brand, title: t('brandTitle'), description: t('brandDescription') });
}

// No sponsor prices on this page (PROMPT.md 5.4c).
export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Brand');
  const tn = await getTranslations('Nav');
  const tp = await getTranslations('Placeholder');

  const directions = partnership.directions.map((d) => loc(d, locale));

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1100, height: 900, left: '50%', marginLeft: -550, top: -420 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <Crumbs items={[{ label: tn('partnerships'), href: ROUTES.partnerships }, { label: tn('brand') }]} />
          <div className="stack g20">
            <Eyebrow>
              <span lang="en">{t('eyebrow')}</span>
            </Eyebrow>
            <h1 className="h1">{t('title')}</h1>
            <p className="lead" style={{ maxWidth: 820 }}>
              {t('lead')}
            </p>
            <div className="row g12" style={{ marginTop: 8 }}>
              <ButtonLink href="#offer">{t('request')}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* İstiqamətlər */}
      <section className="section tight" aria-labelledby="dir-h">
        <div className="wrap">
          <SectionHead id="dir-h" eyebrow={t('directionsEyebrow')} title={t('directionsTitle')} />
          <div className="bento">
            {directions.map((d, i) => {
              const { span, blue } = DIRECTION_LAYOUT[i % DIRECTION_LAYOUT.length];
              return (
                <article key={d} className={cn('card', blue && 'card-blue', span)}>
                  {blue && <CardGlow style={{ right: -200, top: -220 }} />}
                  <span className="tiny" style={{ fontWeight: 800, letterSpacing: '.14em', ...(blue ? { color: 'var(--text)' } : {}) }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="card-title dir-title">{d}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kateqoriyalar */}
      <section className="section tight" aria-labelledby="cat-h">
        <div className="wrap">
          <SectionHead id="cat-h" eyebrow={t('categoriesEyebrow')} title={t('categoriesTitle')} />
          <div className="grid-3 cat-grid">
            {partnership.categories.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? Sparkles;
              return (
                <article key={c.icon} className="card row g20" style={{ flexWrap: 'nowrap' }}>
                  <IconCircle primary>
                    <Icon className="ic" aria-hidden />
                  </IconCircle>
                  <div className="stack g8">
                    <h3 className="h4">{loc(c.label, locale)}</h3>
                    <p className="small">{loc(c.text, locale)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tərəfdaşlar — hidden while content/partnership.json has none */}
      {partnership.partners.length > 0 && (
        <section className="section tight" aria-labelledby="partners-h">
          <div className="wrap">
            <SectionHead id="partners-h" eyebrow={t('partnersEyebrow')} title={t('partnersTitle')} />
            <div className="grid-4">
              {partnership.partners.map((p) => (
                <article key={p.name} className="card stack g16" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <div className="logo-slot" style={{ width: '100%', height: 120 }}>
                    {publicFileExists(p.logo) ? (
                      <Image src={p.logo} alt={p.name} width={200} height={80} style={{ maxHeight: 80, width: 'auto' }} />
                    ) : (
                      <div className="stack g8" style={{ alignItems: 'center' }}>
                        <span className="partner-name">{p.name}</span>
                        <span className="tiny">{tp('logo')}</span>
                      </div>
                    )}
                  </div>
                  <span className="chip chip-sm chip-static">{loc(p.role, locale)}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Forma B */}
      <section className="section" id="offer" aria-labelledby="offer-h">
        <div className="wrap">
          <div className="grid-2 gap-halves" style={{ alignItems: 'start' }}>
            <div className="stack g20">
              <Eyebrow>{t('offerEyebrow')}</Eyebrow>
              <h2 id="offer-h" className="h2">
                {t('request')}
              </h2>
              <p className="lead">{t('offerText')}</p>
            </div>
            <ContactForm kind="B" partnershipTypes={directions} />
          </div>
        </div>
      </section>
    </>
  );
}
