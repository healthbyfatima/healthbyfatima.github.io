import type { Metadata } from 'next';
import Image from 'next/image';
import { Globe, Handshake, Phone, Video } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { HEKIM_BURADA_ENABLED, ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { loc, partnership, publicFileExists } from '@/lib/content';
import { IconCircle } from '@/components/ui/Card';
import { CheckList } from '@/components/ui/CheckList';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PathCard } from '@/components/ui/PathCard';
import { SectionHead } from '@/components/ui/Section';
import { InstagramIcon } from '@/components/icons/Social';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.partnerships, title: t('partnershipsTitle'), description: t('partnershipsDescription') });
}

export default async function PartnershipsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Partnerships');
  const tn = await getTranslations('Nav');

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1000, height: 800, right: -300, top: -360 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="stack g20">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="h1">{t('title')}</h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              {t('text')}
            </p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="grid-2">
            <PathCard
              href={ROUTES.packages}
              variant="surface"
              num={t('packagesNum')}
              icon={<IconCircle primary><Video className="ic" aria-hidden /></IconCircle>}
              heading="h2"
              title={tn('packages')}
              text={t('packagesText')}
              cta={t('packagesCta')}
            >
              <CheckList items={HEKIM_BURADA_ENABLED ? [t('packagesPoint1'), t('packagesPoint2')] : [t('packagesPoint1')]} />
            </PathCard>
            <PathCard
              href={ROUTES.brand}
              num={t('brandNum')}
              icon={<IconCircle><Handshake className="ic" aria-hidden /></IconCircle>}
              heading="h2"
              title={tn('brand')}
              text={t('brandText')}
              cta={t('brandCta')}
            >
              <CheckList items={[t('brandPoint1'), t('brandPoint2')]} />
            </PathCard>
          </div>
        </div>
      </section>
      {/* Tərəfdaşlar — hidden while content/partnership.json has none */}
      {partnership.partners.length > 0 && (
        <section className="section tight" aria-labelledby="partners-h">
          <div className="wrap">
            <SectionHead id="partners-h" title={t('partnersTitle')} />
            <div className="grid-3">
              {partnership.partners.map((p) => (
                <article key={p.name} className="card stack g16" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '100%', height: 96, display: 'grid', placeItems: 'center' }}>
                    {publicFileExists(p.logo) ? (
                      <Image src={p.logo} alt={p.name} width={200} height={80} style={{ height: 80, width: 'auto' }} />
                    ) : (
                      <span className="partner-name">{p.name}</span>
                    )}
                  </div>
                  <span className="chip chip-sm chip-static">{loc(p.role, locale)}</span>
                  <div className="row g12" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                    {p.instagram && (
                      <a className="btn btn-ghost btn-sm auto" href={p.instagram} {...ext}>
                        <InstagramIcon />
                        Instagram
                      </a>
                    )}
                    {p.website && (
                      <a className="btn btn-ghost btn-sm auto" href={p.website} {...ext}>
                        <Globe className="ic sm" aria-hidden />
                        {t('partnersWebsite')}
                      </a>
                    )}
                    {p.phone && (
                      <a className="btn btn-ghost btn-sm auto" href={`tel:${p.phone.replace(/\s/g, '')}`}>
                        <Phone className="ic sm" aria-hidden />
                        {p.phone}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
