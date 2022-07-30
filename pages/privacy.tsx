import path from 'path'

import * as React from 'react'

import type { MDX } from 'contentlayer/core'
import { bundleMDX } from 'mdx-bundler'
import type { GetStaticProps, NextPage } from 'next'

import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

interface PrivacyProps {
  content: MDX
}

const Privacy: NextPage<PrivacyProps> = ({ content }) => {
  return (
    <>
      <SEO title="Privacy" />
      <>
        <SectionTitle>Privacy</SectionTitle>
        <MDXContent content={content} />
      </>
    </>
  )
}

export default Privacy

export const getStaticProps: GetStaticProps = async () => {
  const dataDirectory = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDirectory, 'privacy.mdx')

  const content = await bundleMDX({ file: filePath })

  return {
    props: {
      content,
    },
  }
}
