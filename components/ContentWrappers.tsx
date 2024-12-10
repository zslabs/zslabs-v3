'use client'

import * as React from 'react'

import { motion } from 'motion/react'

import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '~helpers/styles'

export function MotionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.header initial={fadeInDownInitial} animate={fadeInAnimate}>
      {children}
    </motion.header>
  )
}

export function MotionMain({ children }: { children: React.ReactNode }) {
  return (
    <motion.main initial={fadeInUpInitial} animate={fadeInAnimate}>
      {children}
    </motion.main>
  )
}
