import Image from 'next/image';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LOGO, ROUTES, SITE } from '@/lib/site';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/Social';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

// No year, date or "©" in the footer (PROMPT.md §4, §6).
export function Footer() {
  const t = useTranslations('Footer');
  const n = useTranslations('Nav');
  const c = useTranslations('Common');
  return (
    <footer className="ftr">
      <div className="bg-glow" style={{ width: 900, height: 600, left: '50%', marginLeft: -450, bottom: -420 }} aria-hidden />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="ftr-grid">
          <div className="stack g20">
            <Link href={ROUTES.home} aria-label={c('homeAria')} style={{ alignSelf: 'flex-start' }}>
              <Image src={LOGO.src} alt={c('logoAlt')} width={LOGO.width} height={LOGO.height} style={{ height: 52, width: 'auto' }} />
            </Link>
            <p className="body" style={{ maxWidth: 340 }}>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t('tagline')}</span>
              <br />
              {t('taglineSub')}
            </p>
            <div className="socials">
              <a href={SITE.youtube} aria-label="YouTube" {...ext}>
                <YoutubeIcon />
              </a>
              <a href={SITE.instagram} aria-label={`Instagram ${SITE.instagramHandle}`} {...ext}>
                <InstagramIcon />
              </a>
              <a href={SITE.linkedin} aria-label="LinkedIn" {...ext}>
                <LinkedinIcon />
              </a>
            </div>
          </div>
          <nav aria-labelledby="ftr-site">
            <h4 id="ftr-site">{t('site')}</h4>
            <div className="ftr-links">
              <Link href={ROUTES.home}>{n('home')}</Link>
              <Link href={ROUTES.episodes}>{n('episodes')}</Link>
              <Link href={ROUTES.about}>{n('about')}</Link>
              <Link href={ROUTES.contact}>{n('contact')}</Link>
            </div>
          </nav>
          <nav aria-labelledby="ftr-partner">
            <h4 id="ftr-partner">{t('partnerships')}</h4>
            <div className="ftr-links">
              <Link href={ROUTES.packages}>{n('packages')}</Link>
              <Link href={ROUTES.brand}>{n('brand')}</Link>
            </div>
          </nav>
          <div>
            <h4>{t('contact')}</h4>
            <div className="ftr-links">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.instagram} {...ext}>
                {SITE.instagramHandle}
              </a>
              <a href={SITE.whatsapp} {...ext}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="disclaimer">
          <Info className="ic" aria-hidden style={{ color: 'var(--primary-glow-from)', marginTop: 1 }} />
          <p className="small">
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{t('disclaimerTitle')}</span> {t('disclaimer')}
          </p>
        </div>
        <div className="ftr-bottom">
          <span className="tiny">{t('bottom')}</span>
        </div>
      </div>
    </footer>
  );
}
