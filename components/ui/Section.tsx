import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type SectionProps = {
  children: ReactNode;
  tight?: boolean;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function Section({ children, tight, className, id, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('section', tight && 'tight', className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

type SectionHeadProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
};

/** Eyebrow + h2 + optional lead on the left, optional link on the right. */
export function SectionHead({ id, eyebrow, title, text, action }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <div className="left">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="h2">
          {title}
        </h2>
        {text && <p className="lead">{text}</p>}
      </div>
      {action}
    </div>
  );
}
