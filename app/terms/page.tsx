import { notFound } from 'next/navigation'

import { allStatics } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import PageTitle from '~components/PageTitle'

export const metadata = {
  title: 'Terms & conditions',
}

export default function Terms() {
  const page = allStatics.find((p) => {
    return p.slug === 'terms'
  })

  if (!page) {
    notFound()
  }

  return (
    <>
      <MotionHeader>
        <PageTitle>{page.title}</PageTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={page.body} />
      </MotionMain>
    </>
  )
}
