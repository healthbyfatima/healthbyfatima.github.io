import type { Metadata } from 'next';
import { Handshake, Mic, ShieldCheck, Video } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { IconCircle } from '@/components/ui/Card';
import { CheckList } from '@/components/ui/CheckList';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PathCard } from '@/components/ui/PathCard';

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
  const tc = await getTranslations('Common');

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
          <div className="grid-3">
            <PathCard
              href={ROUTES.beGuest}
              num={t('guestNum')}
              icon={<IconCircle><Mic className="ic" aria-hidden /></IconCircle>}
              heading="h2"
              title={tn('beGuest')}
              text={t('guestText')}
              cta={t('guestCta')}
            >
              <CheckList items={[t('guestPoint1'), t('guestPoint2')]} />
            </PathCard>
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
              <CheckList items={[t('packagesPoint1'), t('packagesPoint2')]} />
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

      <section className="section tight">
        <div className="wrap">
          <div className="card" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <IconCircle primary>
              <ShieldCheck className="ic" aria-hidden />
            </IconCircle>
            <div className="stack g8" style={{ flex: '1 1 400px' }}>
              <h2 className="h4">{t('principleTitle')}</h2>
              <p className="body">{t('principleText')}</p>
            </div>
            <ButtonLink href={ROUTES.mediaKit} fit className="self-center">
              {tc('mediaKit')}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
