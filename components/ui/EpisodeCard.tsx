'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export type EpisodeCardData = {
  youtubeId: string;
  title: string;
  /** "[Ad Soyad] · [İxtisas]" line under the title. */
  meta: string;
  /** Localised topic label for the chip. */
  topic: string;
  sponsored?: boolean;
};

const isRealId = (id: string) => /^[\w-]{11}$/.test(id);

/** Lite YouTube embed: thumbnail + play button; the iframe loads only after a click. */
export function EpisodeCard({ episode }: { episode: EpisodeCardData }) {
  const t = useTranslations('Episode');
  const tc = useTranslations('Common');
  const [playing, setPlaying] = useState(false);
  const real = isRealId(episode.youtubeId);

  return (
    <article className="ep">
      {playing && real ? (
        <div className="ep-player" role="region" aria-label={t('player')}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="ep-thumb"
          onClick={() => setPlaying(true)}
          aria-label={t('play', { title: episode.title })}
          disabled={!real}
        >
          {real ? (
            <Image
              src={`https://i.ytimg.com/vi/${episode.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 768px) 400px, 100vw"
            />
          ) : (
            <span className="ph-label">{t('thumbPlaceholder')}</span>
          )}
          {episode.sponsored && <span className="tag-sponsored">{tc('sponsored')}</span>}
          <span className="play">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
      <div className="ep-body">
        <div className="row g8">
          <span className="chip chip-sm chip-static">{episode.topic}</span>
          {episode.sponsored && (
            <span className="tiny" style={{ fontWeight: 600 }}>
              {tc('paidPartnership')}
            </span>
          )}
        </div>
        <h3 className="ep-title">{episode.title}</h3>
        <p className="ep-meta">{episode.meta}</p>
      </div>
    </article>
  );
}
