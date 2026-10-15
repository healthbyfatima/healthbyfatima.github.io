import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { ROUTES } from '@/lib/site';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <section className="hero" style={{ padding: '120px 0 140px' }}>
      <div className="hero-rings" aria-hidden style={{ top: -300 }}>
        <span style={{ width: '100%', height: '100%' }} />
        <span style={{ width: '70%', height: '70%' }} />
        <span style={{ width: '42%', height: '42%' }} />
      </div>
      <div className="bg-glow" style={{ width: 900, height: 700, left: '50%', marginLeft: -450, top: -140 }} aria-hidden />
      <div className="wrap stack g20" style={{ alignItems: 'center', position: 'relative' }}>
        <p className="big404" aria-hidden>
          404
        </p>
        <h1 className="h2">{t('title')}</h1>
        <p className="lead" style={{ maxWidth: 560 }}>
          {t('text')}
        </p>
        <div className="row g12" style={{ justifyContent: 'center', marginTop: 12, width: '100%' }}>
          <ButtonLink href={ROUTES.home}>{t('home')}</ButtonLink>
          <ButtonLink href={ROUTES.episodes} variant="ghost">
            {t('episodes')}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
