'use client'

import { MotionConfig } from 'framer-motion'

import { spring } from '~helpers/styles'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig transition={spring}>{children}</MotionConfig>
}
