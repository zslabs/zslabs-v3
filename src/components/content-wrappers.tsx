import * as React from 'react'

import { m } from 'framer-motion'

import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '@/helpers/styles'

export function MotionHeader({ children }: { children: React.ReactNode }) {
  return (
    <m.header initial={fadeInDownInitial} animate={fadeInAnimate}>
      {children}
    </m.header>
  )
}

export function MotionMain({ children }: { children: React.ReactNode }) {
  return (
    <m.main initial={fadeInUpInitial} animate={fadeInAnimate}>
      {children}
    </m.main>
  )
}
