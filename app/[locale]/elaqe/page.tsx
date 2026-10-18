import type { Metadata } from 'next';
import { Mail, MessageCircle } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES, SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { loc, partnership } from '@/lib/content';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/Social';
import { ButtonLink } from '@/components/ui/Button';
import { CardGlow, IconCircle } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactTabs } from '@/components/forms/ContactTabs';

type Props = { params: Promise<{ locale: Locale }> };

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: ROUTES.contact, title: t('contactTitle'), description: t('contactDescription') });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  const directions = partnership.directions.map((d) => loc(d, locale));
  const links = [
    { href: `mailto:${SITE.email}`, icon: <Mail className="ic sm" aria-hidden />, label: SITE.email, external: false },
    { href: SITE.instagram, icon: <InstagramIcon />, label: SITE.instagramHandle, external: true },
    { href: SITE.youtube, icon: <YoutubeIcon />, label: 'YouTube · @FatimaNuriyeva1', external: true },
    { href: SITE.linkedin, icon: <LinkedinIcon />, label: 'LinkedIn', external: true }
  ];

  return (
    <>
      <section className="page-hero">
        <div className="bg-glow" style={{ width: 1000, height: 800, right: -300, top: -380 }} aria-hidden />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="stack g20">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="h1">{t('title')}</h1>
            <p className="lead" style={{ maxWidth: 720 }}>
              {t('lead')}
            </p>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="bento" style={{ alignItems: 'start' }}>
            <div className="s8 stack g20">
              <ContactTabs partnershipTypes={directions} />
            </div>
            <aside className="s4 stack g20" aria-label={t('asideAria')}>
              <div className="card card-blue stack g16">
                <CardGlow style={{ right: -220, top: -220 }} />
                <IconCircle>
                  <MessageCircle className="ic" aria-hidden />
                </IconCircle>
                <div>
                  <h2 className="h4">{t('waTitle')}</h2>
                  <p className="card-text">{t('waText')}</p>
                </div>
                <ButtonLink href={SITE.whatsapp} size="sm" fit>
                  {t('waOpen')}
                </ButtonLink>
              </div>
              <div className="card stack g16">
                <h2 className="h4">{t('infoTitle')}</h2>
                <ul className="ftr-links" style={{ listStyle: 'none', padding: 0, margin: 0, gap: 6 }}>
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} style={{ gap: 12 }} {...(l.external ? ext : {})}>
                        <span className="icon-circle sm">{l.icon}</span>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
