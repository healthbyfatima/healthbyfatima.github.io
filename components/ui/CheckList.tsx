import type { CSSProperties, ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export function CheckList({ items, className, style }: { items: ReactNode[]; className?: string; style?: CSSProperties }) {
  return (
    <ul className={cn('checklist', className)} style={style}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="ck">
            <Check className="ic" aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
