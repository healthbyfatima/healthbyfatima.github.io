import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Building, Clock, Cpu, Film, ListChecks, MapPin, Plus, Search, Stethoscope, TrendingUp, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { YoutubeIcon } from '@/components/icons/Social';
import { ArrowLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Crumbs } from '@/components/ui/Crumbs';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.beGuest, title: t('beGuestTitle'), description: t('beGuestDescription') });
}

function StepCard({ span, icon, primary, title, text }: { span: string; icon: ReactNode; primary?: boolean; title: string; text: string }) {
  return (
    <article className={`card ${span}`}>
      <IconCircle primary={primary}>{icon}</IconCircle>
      <h3 className="card-title" style={{ marginTop: 24 }}>
        {title}
      </h3>
      <p className="card-text">{text}</p>
    </article>
  );
}

// "Qonaq ol" has no prices on purpose (PROMPT.md 5.4: invited experts ≠ paid promotion).
export default async function BeGuestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('BeGuest');
  const tn = await getTranslations('Nav');

  const who: [ReactNode, string][] = [
    [<Stethoscope key="d" className="ic sm" aria-hidden />, t('whoDoctors')],
    [<Plus key="s" className="ic sm" aria-hidden />, t('whoSurgeons')],
    [<Building key="l" className="ic sm" aria-hidden />, t('whoLeaders')],
    [<Search key="r" className="ic sm" aria-hidden />, t('whoResearchers')],
    [<TrendingUp key="f" className="ic sm" aria-hidden />, t('whoFinance')],
    [<Cpu key="t" className="ic sm" aria-hidden />, t('whoTech')]
  ];

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1000, height: 800, left: -300, top: -360 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <Crumbs items={[{ label: tn('partnerships'), href: ROUTES.partnerships }, { label: tn('beGuest') }]} />
          <div className="grid-2 gap-halves" style={{ alignItems: 'end' }}>
            <div className="stack g20">
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="h1">{tn('beGuest')}</h1>
            </div>
            <p className="lead">{t('lead')}</p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="card card-blue pad-md">
            <CardGlow style={{ right: -160, top: -220 }} />
            <div className="stack g20">
              <h2 className="h3">{t('whoTitle')}</h2>
              <p className="card-text" style={{ maxWidth: 760, margin: 0 }}>
                {t('whoText')}
              </p>
              <ul className="filters" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {who.map(([icon, label]) => (
                  <li key={label} className="chip chip-static">
                    {icon}
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" aria-labelledby="format-h">
        <div className="wrap">
          <SectionHead id="format-h" eyebrow={t('formatEyebrow')} title={t('formatTitle')} />
          <div className="bento">
            <StepCard span="s4" primary icon={<Clock className="ic" aria-hidden />} title={t('hourTitle')} text={t('hourText')} />
            <StepCard span="s8" primary icon={<ListChecks className="ic" aria-hidden />} title={t('questionsTitle')} text={t('questionsText')} />
            <StepCard span="s4" icon={<YoutubeIcon className="ic" />} title={t('youtubeTitle')} text={t('youtubeText')} />
            <StepCard span="s4" icon={<Film className="ic" aria-hidden />} title={t('shortsTitle')} text={t('shortsText')} />
            <StepCard span="s4" icon={<Users className="ic" aria-hidden />} title={t('sharedTitle')} text={t('sharedText')} />
            <article className="card s12" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <IconCircle>
                <MapPin className="ic" aria-hidden />
              </IconCircle>
              <p className="body" style={{ flex: '1 1 300px' }}>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t('studioTitle')}</span> {t('studioText')}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="apply" aria-labelledby="apply-h">
        <div className="wrap">
          <div className="grid-2 gap-halves" style={{ alignItems: 'start' }}>
            <div className="stack g20">
              <Eyebrow>{t('applyEyebrow')}</Eyebrow>
              <h2 id="apply-h" className="h2">
                {t('applyTitle')}
              </h2>
              <p className="lead">{t('applyText')}</p>
              <ArrowLink href={ROUTES.episodes} className="self-start">
                {t('previous')}
              </ArrowLink>
            </div>
            <ContactForm kind="guest" />
          </div>
        </div>
      </section>
    </>
  );
}
