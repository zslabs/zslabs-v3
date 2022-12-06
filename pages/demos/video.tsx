import * as React from 'react'

import type { NextPageWithLayout } from 'pages/_app'

import StaticLayout from '~layouts/StaticLayout'

const Video: NextPageWithLayout = () => {
  return <p>TBD</p>
}

Video.getLayout = function getLayout(page: React.ReactElement) {
  return <StaticLayout>{page}</StaticLayout>
}

export default Video
