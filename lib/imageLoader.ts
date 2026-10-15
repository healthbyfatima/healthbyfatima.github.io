// Static export (GitHub Pages) has no image optimizer: serve files as-is and
// prefix local paths with the repo sub-path (NEXT_PUBLIC_BASE_PATH).
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const url = src.startsWith('/') ? `${base}${src}` : src;
  return `${url}${url.includes('?') ? '&' : '?'}w=${width}`;
}
