import { MotionConfig } from 'framer-motion'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Router from 'next/router'

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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig transition={spring}>
      <DefaultSeo {...SEO} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </MotionConfig>
  )
}
