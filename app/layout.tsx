import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Newsreader } from 'next/font/google'
import './globals.css'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/theme-provider'

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
    'Product portfolio of M Krishna, an aspiring Associate Product Manager with hands-on product-operations experience in AI-enabled language learning. Featuring the Mistakes Review case study for Airlearn.',
  openGraph: {
    title: 'M Krishna - APM | AI Products | Learning Tech',
    description:
      'Product portfolio of M Krishna, an aspiring Associate Product Manager with hands-on product-operations experience in AI-enabled language learning.',
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
      'Product portfolio of M Krishna, an aspiring Associate Product Manager with hands-on product-operations experience in AI-enabled language learning.',
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} bg-background`}
    >
      <body className="font-sans antialiased text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                  document.documentElement.classList.toggle('dark', resolved === 'dark');
                  document.documentElement.style.colorScheme = resolved;
                } catch (_) {}
              })();
            `,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
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
        <ThemeProvider>
          <SiteNav />
          <div id="main-content">{children}</div>
          <SiteFooter />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
