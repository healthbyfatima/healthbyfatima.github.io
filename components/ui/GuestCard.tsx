import Image from 'next/image';
import { ArrowRight, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export type GuestCardData = {
  name: string;
  title: string;
  organization: string;
  /** Localised category label. */
  category: string;
  photo?: string;
  href: string;
};

export function GuestCard({ guest }: { guest: GuestCardData }) {
  const t = useTranslations('Guest');
  return (
    <article className="guest">
      <div className="guest-photo" {...(guest.photo ? {} : { role: 'img', 'aria-label': t('photoPlaceholder') })}>
        {guest.photo ? (
          <Image src={guest.photo} alt={guest.name} fill sizes="(min-width: 768px) 300px, 50vw" />
        ) : (
          <div className="stack">
            <User aria-hidden style={{ width: 56, height: 56 }} strokeWidth={1.2} />
            <span className="tiny">{t('photo')}</span>
          </div>
        )}
        <span className="chip chip-sm chip-static">{guest.category}</span>
      </div>
      <div className="guest-body">
        <h3 className="guest-name">{guest.name}</h3>
        <p className="small">{guest.title}</p>
        <p className="tiny">{guest.organization}</p>
        <Link className="link-arrow" href={guest.href}>
          {t('watch')}
          <ArrowRight className="ic sm" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
