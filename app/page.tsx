import { routing } from '@/i18n/routing';

// No middleware on a static host: "/" forwards to the default locale.
export default function RootRedirect() {
  const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${routing.defaultLocale}/`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
      </head>
      <body style={{ background: '#05070F' }}>
        <a href={target} style={{ color: '#FFFFFF' }}>
          Health by Fatima
        </a>
      </body>
    </html>
  );
}
