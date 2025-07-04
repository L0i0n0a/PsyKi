import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PsyKi: Optimale Gewichtung',
  description:
    'Das Optimal Weighting (OW) Modell ist ein theoretisches Modell, das beschreibt, wie ein Mensch oder ein System die Hinweise von einem menschlichen Entscheider und eines automatisierten Hilfsmittels optimal kombiniert, um die beste mögliche Entscheidung zu treffen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
