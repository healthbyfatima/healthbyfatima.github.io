import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'light' | 'primary' | 'ghost';

type Common = {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Keep natural width on phone (design `.btn.auto`); by default buttons go full-width below md. */
  fit?: boolean;
  className?: string;
  children: ReactNode;
};

function classes({ variant = 'light', size = 'md', fit, className }: Omit<Common, 'children'>) {
  return cn('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', fit && 'auto', className);
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Link styled as a button. Internal hrefs are locale-aware. */
export function ButtonLink({ href, ...rest }: Common & { href: string }) {
  const cls = classes(rest);
  if (isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a className={cls} href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {rest.children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {rest.children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  fit,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type="button" className={classes({ variant, size, fit, className })} {...props}>
      {children}
    </button>
  );
}

/** "Hamısı →" style text link. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={cn('link-arrow', className)} href={href}>
      {children}
      <ArrowRight className="ic sm" aria-hidden />
    </Link>
  );
}
