import { notFound } from 'next/navigation'

import { allStatics } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'

export const metadata = {
  title: 'Privacy policy',
}

export default function Privacy() {
  const page = allStatics.find((p) => {
    return p.slug === 'privacy'
  })

  if (!page) {
    notFound()
  }

  return (
    <>
      <MotionHeader>
        <SectionTitle>{page.title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={page.body} />
      </MotionMain>
    </>
  )
}
