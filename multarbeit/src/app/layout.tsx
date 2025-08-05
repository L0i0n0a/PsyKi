import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

/* ========================================
   FONT CONFIGURATION
   ======================================== */

/**
 * Primary sans-serif font configuration
 * Geist Sans - Modern, clean typeface for body text and UI elements
 */
const geistSans = Geist({
  variable: '--font-geist-sans', // CSS custom property for use in Tailwind
  subsets: ['latin'], // Latin character subset for German content
});

/**
 * Monospace font configuration
 * Geist Mono - Used for code blocks, technical content, and data display
 */
const geistMono = Geist_Mono({
  variable: '--font-geist-mono', // CSS custom property for use in Tailwind
  subsets: ['latin'], // Latin character subset for German content
});

/* ========================================
   APPLICATION METADATA
   ======================================== */

/**
 * Application metadata configuration
 * Defines SEO information, page titles, and descriptions for the research application
 */
export const metadata: Metadata = {
  title: 'PsyKi: Optimale Gewichtung',
  description:
    'Das Optimal Weighting (OW) Modell ist ein theoretisches Modell, das beschreibt, wie ein Mensch oder ein System die Hinweise von einem menschlichen Entscheider und eines automatisierten Hilfsmittels optimal kombiniert, um die beste mögliche Entscheidung zu treffen.',
};

/* ========================================
   ROOT LAYOUT COMPONENT
   ======================================== */

/**
 * Root Layout Component
 *
 * Provides the foundational HTML structure for the entire application.
 * This layout wraps all pages and components, ensuring consistent
 * font loading, styling, and HTML structure across the application.
 *
 **/
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='de'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
