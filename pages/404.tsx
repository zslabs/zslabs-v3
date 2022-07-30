import type { NextPage } from 'next'

import SEO from '~components/SEO'

const PageNotFound: NextPage = () => {
  return (
    <>
      <SEO title="Page not found" />
      404
    </>
  )
}

export default PageNotFound
