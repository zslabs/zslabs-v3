'use client'

import * as React from 'react'

import { motion, useAnimation } from 'framer-motion'

import { fadeInUp } from '@/helpers/styles'
import useLayoutAnimationState from '@/hooks/useLayoutAnimationState'
import { stack } from '@css/patterns'

export default function HomepageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const done = useLayoutAnimationState((state) => state.done)
  const indexControls = useAnimation()

  React.useEffect(() => {
    if (done) {
      indexControls.start('onscreen')
    }
  }, [done, indexControls])

  return (
    <motion.div
      className={stack({
        gap: '12',
        md: {
          gap: '16',
        },
      })}
      initial="offscreen"
      variants={fadeInUp}
      animate={indexControls}
    >
      {children}
    </motion.div>
  )
}
