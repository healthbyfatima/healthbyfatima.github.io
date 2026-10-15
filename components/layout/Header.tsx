'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Menu, MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LOGO, MAIN_NAV, ROUTES, SITE } from '@/lib/site';
import { cn } from '@/lib/cn';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/Social';
import { LangSwitch, LangSwitchMobile } from './LangSwitch';

export function Header() {
  const t = useTranslations('Nav');
  const th = useTranslations('Header');
  const tc = useTranslations('Common');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu after navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <header className="hdr">
      <div className="hdr-bar">
        <Link className="hdr-logo" href={ROUTES.home} aria-label={tc('homeAria')}>
          <Image src={LOGO.src} alt={tc('logoAlt')} width={LOGO.width} height={LOGO.height} priority />
        </Link>
        <nav className="nav" aria-label={th('mainNav')}>
          {MAIN_NAV.map((l) => (
            <Link key={l.key} href={l.href} className={cn(isActive(l.href) && 'on')} aria-current={isActive(l.href) ? 'page' : undefined}>
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="hdr-right">
          <LangSwitch />
          <LangSwitchMobile onOpen={() => setOpen(false)} />
          <Link className="btn btn-light btn-sm hdr-cta" href={ROUTES.contact}>
            {tc('cta')}
          </Link>
          <button
            type="button"
            className="burger"
            aria-label={open ? th('closeMenu') : th('openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="ic" aria-hidden /> : <Menu className="ic" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mmenu" aria-label={th('mobileNav')}>
          {MAIN_NAV.map((l) => (
            <Link key={l.key} href={l.href} className={cn('mi', isActive(l.href) && 'on')} aria-current={isActive(l.href) ? 'page' : undefined}>
              {t(l.key)}
              <ChevronRight className="ic sm" aria-hidden />
            </Link>
          ))}
          <div className="stack g12" style={{ padding: '14px 4px 6px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
            <Link className="btn btn-light" href={ROUTES.contact}>
              {tc('cta')}
            </Link>
            <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="ic" aria-hidden />
              {tc('whatsapp')}
            </a>
            <div className="socials" style={{ justifyContent: 'center', paddingTop: 6 }}>
              <a href={SITE.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon />
              </a>
              <a href={SITE.instagram} aria-label={`Instagram ${SITE.instagramHandle}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href={SITE.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
