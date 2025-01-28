import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

import Providers from './providers'

import BaseLayout from '@/layouts/BaseLayout'
import { css } from '@css/css'

import '@/styles/index.css'

export const metadata: Metadata = {
  title: { default: 'Zach Schnackel', template: '%s | Zach Schnackel' },
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
      className={css({
        scrollBehavior: 'smooth',
        backgroundColor: 'slate.1',
        fontWeight: 'normal',
        textStyle: 'body',
        color: 'slate.12',
        fontSize: 'md',
        lineHeight: 'normal',
        fontSmoothing: 'antialiased',
      })}
    >
      <body
        className={css({
          overflowX: 'hidden',
          overflowY: 'scroll',
        })}
      >
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
