import { motion } from 'framer-motion'
import type { NextPage } from 'next'

import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '~helpers/styles'

const PageNotFound: NextPage = () => {
  return (
    <>
      <SEO title="Page not found" />
      <motion.header initial={fadeInDownInitial} animate={fadeInAnimate}>
        <SectionTitle>404</SectionTitle>
      </motion.header>
      <motion.div initial={fadeInUpInitial} animate={fadeInAnimate}>
        It's probably something you did.
      </motion.div>
    </>
  )
}

export default PageNotFound
