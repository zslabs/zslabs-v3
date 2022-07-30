import type { NextPage } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

const PageNotFound: NextPage = () => {
  return (
    <>
      <SEO title="Page not found" />
      <MotionHeader>
        <SectionTitle>404</SectionTitle>
      </MotionHeader>
      <MotionMain>It's probably something you did.</MotionMain>
    </>
  )
}

export default PageNotFound
