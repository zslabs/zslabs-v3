import * as React from 'react'

import { motion } from 'framer-motion'
import type { NextPage } from 'next'

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
        experience
      </motion.header>
      <motion.main initial={fadeInUpInitial} animate={fadeInAnimate}>
        stuff
      </motion.main>
    </>
  )
}

export default Experience
