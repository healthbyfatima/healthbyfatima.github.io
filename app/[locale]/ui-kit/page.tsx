import type { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ROUTES } from '@/lib/site';
import { ArrowLink, Button, ButtonLink } from '@/components/ui/Button';
import { Card, IconCircle } from '@/components/ui/Card';
import { CheckList } from '@/components/ui/CheckList';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PackageCard } from '@/components/ui/PackageCard';
import { PathCard } from '@/components/ui/PathCard';

// Internal component sheet (mirrors docs/design/source/Components.dc.html). Not indexed, not in the sitemap.
export const metadata: Metadata = { title: 'UI kit', robots: { index: false, follow: false } };

const tokens = [
  ['--bg', '#05070F · səhifə fonu', 'var(--bg)'],
  ['--surface', '#0B1024 · kart', 'var(--surface)'],
  ['--surface-2', '#101A3D · pill, input', 'var(--surface-2)'],
  ['--primary', '#2F5BFF · aktiv element', 'var(--primary)'],
  ['--primary-glow', '#3D6BFF → #1B3BD6', 'var(--grad-glow)'],
  ['Kart qradiyenti', '#1E3FD9 → #0B1A6B', 'var(--grad-card)'],
  ['--text', '#FFFFFF · başlıq', 'var(--text)'],
  ['--text-muted', '#A8B3D6 · izah', 'var(--text-muted)']
];

export default async function UiKit({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ep = { youtubeId: '', title: '[Buraxılışın adı]', meta: '[Ad Soyad] · [İxtisas]', topic: 'Klinik təcrübə' };
  return (
    <div style={{ padding: '64px 0 96px' }}>
      <div className="wrap stack g48">
        <div className="stack g16">
          <Eyebrow>Health by Fatima · UI kit</Eyebrow>
          <h1 className="h1">Komponentlər və vəziyyətlər</h1>
        </div>

        <section className="stack g20">
          <h2 className="h3">Rəng tokenləri</h2>
          <div className="grid-4">
            {tokens.map(([name, note, bg]) => (
              <Card key={name} className="stack g12" style={{ padding: 20 }}>
                <div style={{ height: 72, borderRadius: 12, background: bg, border: '1px solid var(--border)' }} />
                <b>{name}</b>
                <span className="tiny">{note}</span>
              </Card>
            ))}
          </div>
        </section>

        <Card as="section" className="stack g20">
          <h2 className="h3">Montserrat · 400 / 600 / 700 / 800</h2>
          <p style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>Əə Iı İi Şş Ğğ Çç Öö Üü</p>
          <p style={{ fontSize: 32, fontWeight: 700 }}>Səhiyyəyə 360° baxış. Здравоохранение — взгляд на 360°.</p>
          <p style={{ fontSize: 20, fontWeight: 600 }}>Müraciətiniz qəbul edildi · Подать заявку на сотрудничество</p>
          <p className="body">400 — Tibb, idarəetmə, biznes, siyasət və innovasiyanın kəsişməsində səhiyyəni formalaşdıran insanlarla söhbətlər.</p>
          <p className="body italic">400 italic — Where healthcare meets ideas</p>
        </Card>

        <section className="grid-2">
          <Card className="stack g20">
            <h2 className="h4">Button</h2>
            <div className="row g12">
              <ButtonLink href={ROUTES.contact} fit>Əməkdaşlıq üçün müraciət et</ButtonLink>
              <ButtonLink href={ROUTES.episodes} variant="primary" fit>Buraxılışları izlə</ButtonLink>
            </div>
            <div className="row g12">
              <Button variant="ghost" fit>WhatsApp ilə yaz</Button>
              <Button size="sm" fit>Kiçik</Button>
              <Button variant="primary" fit disabled>
                <span className="spinner" aria-hidden />
                Göndərilir…
              </Button>
            </div>
            <div className="row g12">
              <Button fit>Подать заявку на сотрудничество</Button>
            </div>
            <ArrowLink href={ROUTES.episodes}>Hamısı</ArrowLink>
          </Card>
          <Card className="stack g20">
            <h2 className="h4">Eyebrow · Chip · Tag</h2>
            <Eyebrow>Healthcare media platform</Eyebrow>
            <div className="filters">
              <button type="button" className="chip on">Hamısı</button>
              <button type="button" className="chip">Klinik təcrübə</button>
              <button type="button" className="chip">Wellness</button>
            </div>
            <div className="row g12">
              <span className="chip chip-sm chip-static">Səhiyyə siyasəti</span>
            </div>
          </Card>
        </section>

        <section className="stack g20">
          <h2 className="h3">Card · CheckList · PathCard · PackageCard</h2>
          <div className="grid-3">
            <Card as="article">
              <IconCircle primary>
                <Clock className="ic" aria-hidden />
              </IconCircle>
              <h3 className="card-title" style={{ marginTop: 24 }}>Card · surface</h3>
              <p className="card-text">Tünd kart, 1px şəffaf-göy çərçivə, radius 24.</p>
              <CheckList style={{ marginTop: 20 }} items={['CheckList elementi', 'İkinci element']} />
            </Card>
            <PathCard href={ROUTES.packages} num="01" title="PathCard · blue" text="Bütün kart link kimi işləyir." cta="Ətraflı" className="!min-h-0" />
            <PackageCard eyebrow="Əlavə xidmət" title="PackageCard" note="Əsas paketə əlavə olaraq seçilə bilər." />
          </div>
        </section>

        <section className="stack g20">
          <h2 className="h3">EpisodeCard</h2>
          <div className="grid-3">
            <EpisodeCard episode={ep} />
            <EpisodeCard episode={{ ...ep, meta: '[Ad Soyad] · [Vəzifə]', topic: 'Səhiyyə idarəçiliyi' }} />
            <EpisodeCard episode={{ ...ep, topic: 'Wellness' }} />
          </div>
        </section>

        <section className="stack g20">
          <h2 className="h3">ComparisonTable</h2>
          <ComparisonTable
            headers={['Xidmət', 'Podcast', 'Podcast + tanıtım']}
            rows={[
              { label: 'Podcast müsahibəsi', a: true, b: true },
              { label: 'Fərdi həkim tanıtımı', a: false, b: true }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
