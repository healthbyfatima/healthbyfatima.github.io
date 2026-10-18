// Contact data and routes shared by header, footer, forms and SEO.
export const SITE = {
  name: 'Health by Fatima',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'fatimanuriyevaa@gmail.com',
  whatsapp: 'https://wa.me/message/TB7Q2IZZOQG3D1',
  youtube: 'https://www.youtube.com/@FatimaNuriyeva1',
  instagram: 'https://www.instagram.com/healthbyfatima',
  instagramHandle: '@healthbyfatima',
  instagramFounder: 'https://www.instagram.com/fatimanuriyeva1',
  instagramFounderHandle: '@fatimanuriyeva1',
  linkedin: 'https://www.linkedin.com/in/fatima-nuriyeva-2bb002314'
} as const;

export const LOGO = { src: '/brand/logo-white.svg', width: 3178, height: 1544 } as const;

export const ROUTES = {
  home: '/',
  episodes: '/buraxilislar',
  partnerships: '/emekdasliq',
  packages: '/emekdasliq/media-paketleri',
  brand: '/emekdasliq/terefdasliq',
  about: '/haqqimizda',
  contact: '/elaqe'
} as const;

export type NavKey = 'home' | 'episodes' | 'partnerships' | 'about' | 'contact';

export const MAIN_NAV: { key: NavKey; href: string }[] = [
  { key: 'home', href: ROUTES.home },
  { key: 'episodes', href: ROUTES.episodes },
  { key: 'partnerships', href: ROUTES.partnerships },
  { key: 'about', href: ROUTES.about },
  { key: 'contact', href: ROUTES.contact }
];
