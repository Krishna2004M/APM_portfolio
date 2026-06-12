import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import './globals.css'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'M Krishna - APM | AI Products | Learning Tech',
  description:
    'Product portfolio of M Krishna, an Associate Product Manager focused on AI-enabled language learning with hands-on product-operations experience. Featuring the Mistakes Review case study for Airlearn.',
  openGraph: {
    title: 'M Krishna - APM | AI Products | Learning Tech',
    description:
      'Product portfolio of M Krishna, an Associate Product Manager focused on AI-enabled language learning with hands-on product-operations experience.',
    url: 'https://v0-mkrishna.vercel.app',
    siteName: 'M Krishna Portfolio',
    images: [
      {
        url: 'https://v0-mkrishna.vercel.app/icon.svg',
        width: 1200,
        height: 630,
        alt: 'M Krishna - APM Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M Krishna - APM | AI Products | Learning Tech',
    description:
      'Product portfolio of M Krishna, an Associate Product Manager focused on AI-enabled language learning with hands-on product-operations experience.',
    images: ['https://v0-mkrishna.vercel.app/icon.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${newsreader.variable} bg-background`}
    >
      <body className="font-sans antialiased text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'M Krishna',
              jobTitle: 'Associate Product Manager',
              url: 'https://v0-mkrishna.vercel.app',
              sameAs: [
                'https://linkedin.com/in/m-krishna-krishna',
                'https://github.com/Krishna2004M',
              ],
            }),
          }}
        />
        <SiteNav />
        <div id="main-content">{children}</div>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
