import { Montserrat } from 'next/font/google';

// Montserrat covers ə/Ə, ı, İ, ş, ğ, ç, ö, ü and full Cyrillic (PROMPT.md §2).
export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat'
});
