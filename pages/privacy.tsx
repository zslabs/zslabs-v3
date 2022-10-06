import * as React from 'react'

import { allStatics } from 'contentlayer/generated'
import type { InferGetStaticPropsType } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

export const getStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentPage = allStatics.find((page) => {
    return page.slug === 'privacy'
  })!

  return {
    props: {
      page: currentPage,
    },
  }
}

const Privacy = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO title={page.title} />
      <MotionHeader>
        <SectionTitle>{page.title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={page.body} />
      </MotionMain>
    </>
  )
}

export default Privacy
