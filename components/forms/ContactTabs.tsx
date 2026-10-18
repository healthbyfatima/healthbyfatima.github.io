'use client';

import { useState, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { ContactForm } from './ContactForm';

const TABS = ['doctors', 'partners'] as const;
type Tab = (typeof TABS)[number];

/** Two application types on /elaqe: doctors (form A) and partners (form B). */
export function ContactTabs({ partnershipTypes }: { partnershipTypes: string[] }) {
  const t = useTranslations('Contact');
  const [tab, setTab] = useState<Tab>('doctors');

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next = TABS[(TABS.indexOf(tab) + 1) % TABS.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label={t('tabsAria')} onKeyDown={onKey}>
        {TABS.map((k) => (
          <button
            key={k}
            id={`tab-${k}`}
            type="button"
            role="tab"
            className={cn(tab === k && 'on')}
            aria-selected={tab === k}
            aria-controls="tab-panel"
            tabIndex={tab === k ? 0 : -1}
            onClick={() => setTab(k)}
          >
            {t(k === 'doctors' ? 'tabDoctors' : 'tabPartners')}
          </button>
        ))}
      </div>
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === 'doctors' ? <ContactForm kind="A" /> : <ContactForm kind="B" partnershipTypes={partnershipTypes} />}
      </div>
    </>
  );
}
