import * as React from 'react'

import { motion } from 'framer-motion'
import type { NextPage } from 'next'

import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '~helpers/styles'

const Experience: NextPage = () => {
  return (
    <>
      <SEO title="Experience" />

      <motion.header initial={fadeInDownInitial} animate={fadeInAnimate}>
        <SectionTitle>Experience</SectionTitle>
      </motion.header>
      <motion.main initial={fadeInUpInitial} animate={fadeInAnimate}>
        stuff
      </motion.main>
    </>
  )
}

export default Experience
