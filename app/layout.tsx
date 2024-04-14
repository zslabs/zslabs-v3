import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

import Providers from './providers'

import { css } from '~css/css'
import BaseLayout from '~layouts/BaseLayout'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/jetbrains-mono'

import '~styles/index.css'

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
      })}
    >
      <body
        className={css({
          overflowX: 'hidden',
          overflowY: 'scroll',
          backgroundColor: 'slate.1',
          fontWeight: 'normal',
          color: 'slate.12',
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
