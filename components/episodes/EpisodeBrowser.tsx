'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { EpisodeCard, type EpisodeCardData } from '@/components/ui/EpisodeCard';

export type BrowsableEpisode = EpisodeCardData & { topicKey: string };

/** Topic filter + free-text search over the episode list. */
export function EpisodeBrowser({ episodes, topics }: { episodes: BrowsableEpisode[]; topics: { key: string; label: string }[] }) {
  const t = useTranslations('Episodes');
  const tc = useTranslations('Common');
  const [topic, setTopic] = useState('all');
  const [q, setQ] = useState('');

  const needle = q.trim().toLowerCase();
  const list = episodes.filter(
    (e) => (topic === 'all' || e.topicKey === topic) && (!needle || `${e.title} ${e.meta}`.toLowerCase().includes(needle))
  );

  return (
    <div className="stack g32">
      <div className="card stack g20">
        <div className="search">
          <label htmlFor="ep-search" className="hp">
            {t('searchLabel')}
          </label>
          <Search className="ic" aria-hidden />
          <input id="ep-search" className="input" type="search" placeholder={t('searchPh')} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {topics.length > 0 && (
          <div className="filters" role="group" aria-label={t('topicsAria')}>
            {[{ key: 'all', label: tc('all') }, ...topics].map((c) => (
              <button key={c.key} type="button" className={cn('chip', topic === c.key && 'on')} aria-pressed={topic === c.key} onClick={() => setTopic(c.key)}>
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="small" aria-live="polite">
        {t('count', { count: list.length })}
      </p>
      <div className="grid-3">
        {list.map((e, i) => (
          <EpisodeCard key={e.youtubeId || i} episode={e} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="card stack g16" style={{ alignItems: 'center', textAlign: 'center', padding: '64px 24px' }}>
          <span className="icon-circle">
            <Search className="ic" aria-hidden />
          </span>
          <h2 className="h4">{t('emptyTitle')}</h2>
          <p className="body">{t('emptyText')}</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm auto"
            onClick={() => {
              setTopic('all');
              setQ('');
            }}
          >
            {t('reset')}
          </button>
        </div>
      )}
    </div>
  );
}
