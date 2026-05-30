import { DM_Mono, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata = {
  title: 'Anjal Ventures - Premium Digital Product Studio',
  description: 'Anjal Ventures builds premium websites, mobile apps, SaaS platforms, AI systems, and digital transformation infrastructure for African businesses.',
  keywords: 'web development Nigeria, mobile app development, AI solutions Africa, SaaS platform, Damaturu technology company, digital transformation, custom software',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Anjal Ventures',
  },
  formatDetection: {
    telephone: false,
  },
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  alternates: {
    canonical: 'https://anjalventures.com',
  },
  openGraph: {
    title: 'Anjal Ventures - Premium Digital Product Studio',
    description: 'Premium digital products, mobile apps, SaaS, AI automation, and enterprise web platforms.',
    type: 'website',
    url: 'https://anjalventures.com',
    siteName: 'Anjal Ventures',
    locale: 'en_NG',
    images: [
      {
        url: 'https://anjalventures.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anjal Ventures - Digital Product Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anjal Ventures - Premium Digital Product Studio',
    description: 'Premium digital products, mobile apps, SaaS, AI automation, and enterprise web platforms.',
    creator: '@anjalventures',
    images: ['https://anjalventures.com/og-image.png'],
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
}

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anjal Ventures',
    url: 'https://anjalventures.com',
    logo: 'https://anjalventures.com/logo.png',
    description: 'Premium digital product studio building websites, mobile apps, SaaS, AI systems, and digital infrastructure.',
    sameAs: [
      'https://facebook.com/anjalventures',
      'https://twitter.com/anjalventures',
      'https://linkedin.com/company/anjal-ventures',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressRegion: 'Yobe',
      addressLocality: 'Damaturu',
      streetAddress: 'Damaturu',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-8140011111',
      contactType: 'Customer Service',
      email: 'anjalventures@gmail.com',
    },
  }

  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <GoogleAnalytics />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="bg-white font-sans text-slate-950 antialiased">
        {children}
      </body>
    </html>
  )
}
