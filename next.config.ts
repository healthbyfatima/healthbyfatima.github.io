import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Static site for GitHub Pages: no server, no middleware, no image optimizer.
// NEXT_PUBLIC_BASE_PATH is the repo sub-path (e.g. /health-by-fatima); empty locally.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { loader: 'custom', loaderFile: './lib/imageLoader.ts' }
};

export default withNextIntl(nextConfig);
