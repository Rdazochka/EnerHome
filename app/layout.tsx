import type { Metadata } from 'next';
import { IBM_Plex_Serif, Inter, Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700'],
  variable: '--font-ibm-plex-serif',
});

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'EnerHome',
  description: 'Енергоефективні рішення для вашого дому',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body
        className={`${montserrat.variable} ${inter.variable} ${ibmPlexSerif.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
