import * as Tooltip from '@radix-ui/react-tooltip'
import { MotionConfig } from 'framer-motion'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo.config'

import { spring } from '~helpers/styles'
import BaseLayout from '~layouts/BaseLayout'

import '~styles/index.css'

/* eslint-disable no-undef */
Router.events.on('routeChangeComplete', (url) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      window.gtag('config', 'UA-17637644-1', {
        page_location: url,
        page_title: document.title,
      })
    }, 0)
  }
})
/* eslint-enable no-undef */

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>)

  return (
    <Tooltip.Provider delayDuration={250}>
      <MotionConfig transition={spring}>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </MotionConfig>
    </Tooltip.Provider>
  )
}
