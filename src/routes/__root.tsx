import { css } from '@css/css'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import SectionTitle from '@/components/section-title'
import BaseLayout from '@/layouts/base-layout'
import Providers from '@/lib/providers'
import appCss from '@/styles/index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Zach Schnackel' },
      {
        name: 'description',
        content: 'Full-stack/motion developer',
      },
    ],
    links: [
      {
        rel: 'preload',
        href: '/fonts/TT_Commons_Pro_Variable.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/TT_Commons_Pro_Mono_Variable.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '144x144',
        href: '/icon.png',
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <html
      lang="en"
      className={css({
        scrollBehavior: 'smooth',
        backgroundColor: 'slate.1',
        fontWeight: 'normal',
        textStyle: 'body',
        color: 'slate.11',
        fontSize: 'md',
        lineHeight: 'normal',
        fontSmoothing: 'antialiased',
      })}
    >
      <head>
        <HeadContent />
      </head>
      <body
        className={css({
          overflowX: 'hidden',
          overflowY: 'scroll',
        })}
      >
        <Providers>
          <BaseLayout>
            <Outlet />
          </BaseLayout>
        </Providers>
        <Analytics />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>404</SectionTitle>
      </MotionHeader>
      <MotionMain>It&apos;s probably something you did.</MotionMain>
    </>
  )
}
