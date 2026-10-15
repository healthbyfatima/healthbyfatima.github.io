import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type PathCardProps = {
  href: string;
  num: string;
  title: string;
  text: ReactNode;
  cta: string;
  variant?: 'surface' | 'blue';
  icon?: ReactNode;
  /** h3 inside a section, h2 when the cards are the page's main list. */
  heading?: 'h2' | 'h3';
  children?: ReactNode;
  className?: string;
};

/** Whole card is a link (Əməkdaşlıq yolları). */
export function PathCard({ href, num, title, text, cta, variant = 'blue', icon, heading: H = 'h3', children, className }: PathCardProps) {
  return (
    <Link href={href} className={cn('card path', variant === 'blue' && 'card-blue', className)}>
      <div className="card-glow" style={{ right: -200, top: -200 }} aria-hidden />
      <span className="num">{num}</span>
      {icon}
      <div>
        <H className="card-title">{title}</H>
        <p className="card-text">{text}</p>
      </div>
      {children}
      <div className="foot">
        <span style={{ fontWeight: 600 }}>{cta}</span>
        <span className="arrow-btn">
          <ArrowRight className="ic" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
