// Exported as 404.html — GitHub Pages serves it for every unknown path.
export default function RootNotFound() {
  return (
    <html lang="az">
      <body style={{ background: '#05070F', color: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'grid', placeItems: 'center', minHeight: '100vh', margin: 0 }}>
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/az/`} style={{ color: '#FFFFFF' }}>
          404 — Health by Fatima
        </a>
      </body>
    </html>
  );
}
