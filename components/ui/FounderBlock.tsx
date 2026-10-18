import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/Social';
import { ArrowLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Founder & Host: portrait, bio and the founder's personal links (Home and About). */
export function FounderBlock({ moreHref }: { moreHref?: string }) {
  const t = useTranslations('Founder');
  const tc = useTranslations('Common');
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  return (
    <div className="grid-2 gap-halves" style={{ ['--gap-halves' as string]: '64px', alignItems: 'center' }}>
      <div className="photo-frame" style={{ ['--photo-ratio' as string]: '4 / 5', maxWidth: 520 }}>
        <Image src="/photos/fatima-portrait.webp" alt={tc('founderAlt')} fill sizes="(min-width: 768px) 520px, 100vw" />
      </div>
      <div className="stack g20">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 id="founder-h" className="h2">
          {t('name')}
        </h2>
        <p className="italic muted" style={{ fontSize: 17 }}>
          {t('role')}
        </p>
        <p className="body">{t('bio1')}</p>
        <p className="body">{t('bio2')}</p>
        <div className="row g12">
          <a className="btn btn-ghost btn-sm auto" href={SITE.instagramFounder} {...ext}>
            <InstagramIcon />
            Instagram
          </a>
          <a className="btn btn-ghost btn-sm auto" href={SITE.linkedin} {...ext}>
            <LinkedinIcon />
            LinkedIn
          </a>
          <a className="btn btn-ghost btn-sm auto" href={SITE.youtube} {...ext}>
            <YoutubeIcon />
            YouTube
          </a>
        </div>
        {moreHref && (
          <div style={{ marginTop: 8 }}>
            <ArrowLink href={moreHref}>{tc('more')}</ArrowLink>
          </div>
        )}
      </div>
    </div>
  );
}
