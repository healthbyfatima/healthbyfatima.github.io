'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/site';

/** Hero "Əməkdaşlıq üçün müraciət et" button: opens a two-choice popup (media packages / brand partnership). */
export function CollabMenu() {
  const t = useTranslations('Common');
  const tn = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => root.current && !root.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div className="cta-menu" ref={root}>
      <button type="button" className="btn btn-light" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        {t('cta')}
        <ArrowRight className="ic sm" aria-hidden />
      </button>
      {open && (
        <div className="cta-pop" role="group" aria-label={t('ctaChoose')}>
          <Link href={ROUTES.packages}>
            {t('ctaPackages')}
            <ChevronRight className="ic sm" aria-hidden />
          </Link>
          <Link href={ROUTES.brand}>
            {tn('brand')}
            <ChevronRight className="ic sm" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
