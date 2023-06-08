import { Analytics } from '@vercel/analytics/react'

import { clashDisplay, manrope, jetBrainsMono } from './fonts'
import Providers from './providers'

import BaseLayout from '~layouts/BaseLayout'
import '~styles/index.css'

export const metadata = {
  title: 'Zach Schnackel',
  description: 'Full-stack/motion developer',
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${manrope.variable} ${jetBrainsMono.variable}`}
    >
      <body className="overflow-x-hidden overflow-y-scroll bg-slate-1 font-medium text-slate-12 antialiased selection:bg-primary-5 selection:text-slate-12">
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
