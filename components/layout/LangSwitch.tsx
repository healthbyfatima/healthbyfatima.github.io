'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [, startTransition] = useTransition();
  return (next: Locale) =>
    startTransition(() => {
      // @ts-expect-error -- params always match the current pathname
      router.replace({ pathname, params }, { locale: next, scroll: false });
    });
}

/** Desktop: three buttons. */
export function LangSwitch() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const switchTo = useSwitchLocale();
  return (
    <div className="lang desk" role="group" aria-label={t('langGroup')}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className={cn(l === locale && 'on')}
          aria-pressed={l === locale}
          onClick={() => l !== locale && switchTo(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** Phone: one globe button that opens a small AZ / EN / RU list. */
export function LangSwitchMobile({ onOpen }: { onOpen?: () => void }) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const switchTo = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-m" ref={ref}>
      <button
        type="button"
        className="lang-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t('langToggle', { lang: locale.toUpperCase() })}
        onClick={() => {
          if (!open) onOpen?.();
          setOpen(!open);
        }}
      >
        <Globe className="ic sm" aria-hidden />
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="lang-pop" role="group" aria-label={t('langGroup')}>
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              lang={l}
              className={cn(l === locale && 'on')}
              aria-pressed={l === locale}
              onClick={() => {
                setOpen(false);
                if (l !== locale) switchTo(l);
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
