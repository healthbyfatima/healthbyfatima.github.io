import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { CheckList } from './CheckList';
import { Eyebrow } from './Eyebrow';

type PackageCardProps = {
  eyebrow: string;
  /** Small chip next to the eyebrow, e.g. "Bir buraxılış". */
  badge?: string;
  title: string;
  price: string;
  priceNote?: string;
  items?: ReactNode[];
  note?: ReactNode;
  variant?: 'surface' | 'blue';
  heading?: 'h2' | 'h3';
  /** Call-to-action, pinned to the bottom of the card. */
  children?: ReactNode;
  className?: string;
};

export function PackageCard({
  eyebrow,
  badge,
  title,
  price,
  priceNote,
  items,
  note,
  variant = 'surface',
  heading: H = 'h3',
  children,
  className
}: PackageCardProps) {
  const blue = variant === 'blue';
  return (
    <article className={cn('card pkg', blue && 'card-blue', className)}>
      <div className="card-glow" style={{ right: -180, top: -220 }} aria-hidden />
      <div className="row g12" style={{ justifyContent: 'space-between' }}>
        <Eyebrow className={blue ? 'text-text' : undefined}>{eyebrow}</Eyebrow>
        {badge && <span className="chip chip-sm chip-static">{badge}</span>}
      </div>
      <div className="stack g12">
        <H className="h3">{title}</H>
        <div className="price">
          <b>{price}</b>
          {priceNote && <span style={{ fontWeight: 600 }}>{priceNote}</span>}
        </div>
      </div>
      {items && <CheckList items={items} />}
      {note && <p className="note">{note}</p>}
      {children}
    </article>
  );
}
