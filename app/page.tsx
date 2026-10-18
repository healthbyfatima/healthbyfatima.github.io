import { routing } from '@/i18n/routing';

// No middleware on a static host: "/" forwards to the default locale.
export default function RootRedirect() {
  const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${routing.defaultLocale}/`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)})` }} />
        {/* Fallback link stays invisible unless the redirect stalls */}
        <style>{'a{opacity:0;animation:show 0s 2s forwards}@keyframes show{to{opacity:1}}'}</style>
      </head>
      <body style={{ background: '#05070F' }}>
        <a href={target} style={{ color: '#FFFFFF' }}>
          Health by Fatima
        </a>
      </body>
    </html>
  );
}
