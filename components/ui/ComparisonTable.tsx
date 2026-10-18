import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ComparisonTableProps = {
  caption?: string;
  headers: [string, string, string];
  rows: { label: string; a: boolean; b: boolean }[];
  footer?: [string, string, string];
};

/** Two-column comparison; the second column is highlighted. Fits 335px on phone. */
export function ComparisonTable({ caption, headers, rows, footer }: ComparisonTableProps) {
  const t = useTranslations('Common');
  const cell = (on: boolean) =>
    on ? (
      <span className="yes" role="img" aria-label={t('yes')}>
        <Check className="ic sm" aria-hidden />
      </span>
    ) : (
      <span className="no" role="img" aria-label={t('no')}>
        —
      </span>
    );
  return (
    <div className="table-box">
      <table className="ctable">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">{headers[0]}</th>
            <th scope="col">{headers[1]}</th>
            <th scope="col" className="hl">
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td>{cell(r.a)}</td>
              <td className="hl">{cell(r.b)}</td>
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              <td>{footer[0]}</td>
              <td>{footer[1]}</td>
              <td className="hl">{footer[2]}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
