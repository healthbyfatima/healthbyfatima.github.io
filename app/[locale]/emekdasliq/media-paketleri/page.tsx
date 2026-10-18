import type { Metadata } from 'next';
import Image from 'next/image';
import { Clock, ListChecks, MessageSquare, Mic, type LucideIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { loc, packages, publicFileExists } from '@/lib/content';
import { ButtonLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { CheckList } from '@/components/ui/CheckList';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { Crumbs } from '@/components/ui/Crumbs';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHead } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';

type Props = { params: Promise<{ locale: Locale }> };

const FORMAT_ICONS: Record<string, LucideIcon> = { clock: Clock, message: MessageSquare, list: ListChecks, mic: Mic };
const HEKIM_BURADA_LOGO = '/partners/hekim-burada.svg';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.packages, title: t('packagesTitle'), description: t('packagesDescription') });
}

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Packages');
  const tn = await getTranslations('Nav');
  const tp = await getTranslations('Placeholder');

  const [podcast, spotlight] = packages.packages;
  const hasLogo = publicFileExists(HEKIM_BURADA_LOGO);

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1000, height: 800, right: -260, top: -360 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <Crumbs items={[{ label: tn('partnerships'), href: ROUTES.partnerships }, { label: tn('packages') }]} />
          <div className="stack g20">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="h1">{t('title')}</h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              {t('lead')}
            </p>
          </div>
        </div>
      </section>

      {/* Paketlər */}
      <section className="section tight">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            <PackageCard
              variant="blue"
              heading="h2"
              eyebrow={loc(podcast.eyebrow, locale)}
              badge={loc(podcast.badge, locale)}
              title={loc(podcast.title, locale)}
              items={podcast.items[locale]}
            >
              <ButtonLink href="#apply" className="mt-auto">
                {loc(podcast.cta, locale)}
              </ButtonLink>
            </PackageCard>
            <PackageCard
              heading="h2"
              eyebrow={loc(spotlight.eyebrow, locale)}
              badge={loc(spotlight.badge, locale)}
              title={loc(spotlight.title, locale)}
              items={spotlight.items[locale]}
              note={spotlight.note && loc(spotlight.note, locale)}
            >
              <ButtonLink href="#apply" variant="ghost" className="mt-auto">
                {loc(spotlight.cta, locale)}
              </ButtonLink>
            </PackageCard>
          </div>
        </div>
      </section>

      {/* Müqayisə */}
      <section className="section tight" aria-labelledby="compare-h">
        <div className="wrap">
          <SectionHead id="compare-h" eyebrow={t('compareEyebrow')} title={t('compareTitle')} />
          <ComparisonTable
            caption={t('compareTitle')}
            headers={[t('colService'), t('colPodcast'), t('colBundle')]}
            rows={packages.comparison.map((r) => ({ label: loc(r.label, locale), a: r.podcast, b: r.bundle }))}
          />
        </div>
      </section>

      {/* Çəkiliş formatı */}
      <section className="section tight" aria-labelledby="format-h">
        <div className="wrap">
          <SectionHead id="format-h" eyebrow={t('formatEyebrow')} title={t('formatTitle')} />
          <div className="grid-4 keep2 fmt">
            {packages.format.map((f) => {
              const Icon = FORMAT_ICONS[f.icon] ?? Clock;
              return (
                <article key={f.icon} className="card">
                  <IconCircle primary>
                    <Icon className="ic" aria-hidden />
                  </IconCircle>
                  <p className="tiny" style={{ marginTop: 22, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                    {loc(f.label, locale)}
                  </p>
                  <h3 className="h4" style={{ marginTop: 6 }}>
                    {loc(f.value, locale)}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Həkim Burada */}
      <section className="section tight">
        <div className="wrap">
          <article className="card card-blue pad-lg">
            <CardGlow style={{ right: -120, bottom: -260 }} />
            <div className="grid-2 gap-halves" style={{ ['--gap-halves' as string]: '48px', alignItems: 'center' }}>
              <div className="stack g20">
                <Eyebrow className="text-text">{t('bonusEyebrow')}</Eyebrow>
                <h2 className="h3 title-lg">{t('bonusTitle')}</h2>
                <p className="card-text" style={{ margin: 0 }}>
                  {t('bonusText')}
                </p>
                <CheckList items={[t('bonusPoint1'), t('bonusPoint2'), t('bonusPoint3')]} />
              </div>
              <div className="stack g16" style={{ alignItems: 'center' }}>
                <div className="logo-slot logo-slot-lg" style={{ background: 'rgba(5,7,15,.25)' }}>
                  {hasLogo ? (
                    <Image src={HEKIM_BURADA_LOGO} alt="Həkim Burada" width={240} height={80} style={{ maxHeight: '70%', width: 'auto' }} />
                  ) : (
                    <div className="stack g8" style={{ alignItems: 'center' }}>
                      <span className="partner-name">Həkim Burada</span>
                      <span className="tiny" style={{ color: 'var(--text)' }}>
                        {tp('logo')}
                      </span>
                    </div>
                  )}
                </div>
                <p className="small center" style={{ color: 'var(--text)' }}>
                  {t('bonusNote')}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Forma */}
      <section className="section" id="apply" aria-labelledby="apply-h">
        <div className="wrap">
          <div className="grid-2 gap-halves" style={{ alignItems: 'start' }}>
            <div className="stack g20">
              <Eyebrow>{t('applyEyebrow')}</Eyebrow>
              <h2 id="apply-h" className="h2">
                {t('applyTitle')}
              </h2>
              <p className="lead">{t('applyText')}</p>
            </div>
            <ContactForm kind="pkg" />
          </div>
        </div>
      </section>
    </>
  );
}
