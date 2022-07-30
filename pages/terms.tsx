import path from 'path'

import * as React from 'react'

import type { MDX } from 'contentlayer/core'
import { motion } from 'framer-motion'
import { bundleMDX } from 'mdx-bundler'
import type { GetStaticProps, NextPage } from 'next'

import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '~helpers/styles'

interface TermsProps {
  content: MDX
}

const Terms: NextPage<TermsProps> = ({ content }) => {
  return (
    <>
      <SEO title="Terms" />
      <motion.header initial={fadeInDownInitial} animate={fadeInAnimate}>
        <SectionTitle>Terms</SectionTitle>
      </motion.header>
      <motion.main initial={fadeInUpInitial} animate={fadeInAnimate}>
        <MDXContent content={content} />
      </motion.main>
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
