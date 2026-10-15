import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  variant?: 'surface' | 'blue';
  as?: 'div' | 'article' | 'section' | 'aside';
  className?: string;
  style?: CSSProperties;
  /** Position of the soft radial glow, e.g. { right: -200, top: -200 }. */
  glow?: CSSProperties;
  children: ReactNode;
};

export function Card({ variant = 'surface', as: Tag = 'div', className, style, glow, children }: CardProps) {
  return (
    <Tag className={cn('card', variant === 'blue' && 'card-blue', className)} style={style}>
      {glow && <div className="card-glow" style={glow} aria-hidden />}
      {children}
    </Tag>
  );
}

export function CardGlow({ style }: { style: CSSProperties }) {
  return <div className="card-glow" style={style} aria-hidden />;
}

export function IconCircle({
  children,
  primary,
  small,
  className
}: {
  children: ReactNode;
  primary?: boolean;
  small?: boolean;
  className?: string;
}) {
  return <span className={cn('icon-circle', primary && 'primary', small && 'sm', className)}>{children}</span>;
}
