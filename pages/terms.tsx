import path from 'path'

import * as React from 'react'

import type { MDX } from 'contentlayer/core'
import { bundleMDX } from 'mdx-bundler'
import type { GetStaticProps, NextPage } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

interface TermsProps {
  content: MDX
}

const Terms: NextPage<TermsProps> = ({ content }) => {
  return (
    <>
      <SEO title="Terms & conditions" />
      <MotionHeader>
        <SectionTitle>Terms & conditions</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={content} />
      </MotionMain>
    </>
  )
}

export default Terms

export const getStaticProps: GetStaticProps = async () => {
  const dataDirectory = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDirectory, 'terms.mdx')

  const content = await bundleMDX({ file: filePath })

  return {
    props: {
      content,
    },
  }
}
