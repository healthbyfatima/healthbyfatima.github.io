import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** "Əməkdaşlıq / Qonağımız olun" trail above sub-page titles. */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  const t = useTranslations('Common');
  return (
    <nav className="crumbs" aria-label={t('breadcrumb')}>
      {items.map((it, i) => (
        <span key={it.label} className="contents">
          {i > 0 && <span aria-hidden>/</span>}
          {it.href ? (
            <Link href={it.href}>{it.label}</Link>
          ) : (
            <span style={{ color: 'var(--text)' }} aria-current="page">
              {it.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
