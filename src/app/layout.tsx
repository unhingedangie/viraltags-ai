import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PWAInstall from '@/components/PWAInstall';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ViralTags AI — TikTok Caption & Hashtag Optimizer',
  description:
    'AI-powered TikTok SEO strategist. Generate optimized captions, hashtags, and trending tags to boost your TikTok visibility and engagement.',
  keywords: [
    'TikTok',
    'hashtag generator',
    'caption optimizer',
    'trending tags',
    'social media SEO',
    'AI tools',
  ],
  authors: [{ name: 'ViralTags AI' }],
  creator: 'ViralTags AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://viraltags.ai',
    siteName: 'ViralTags AI',
    title: 'ViralTags AI — TikTok Caption & Hashtag Optimizer',
    description:
      'AI-powered TikTok SEO strategist. Generate optimized captions, hashtags, and trending tags.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ViralTags AI — TikTok Caption & Hashtag Optimizer',
    description:
      'AI-powered TikTok SEO strategist. Generate optimized captions, hashtags, and trending tags.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-weight='bold' fill='%2300ff88'>#</text></svg>" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ViralTags" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${inter.variable} min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-gray-100 antialiased`}
      >
        <div className="relative">
          {/* Animated gradient background overlay */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>

          {/* Main content */}
          <div className="relative z-0">
            {children}
          </div>
        </div>

        {/* PWA Install Banner */}
        <PWAInstall />
      </body>
    </html>
  );
}
