'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { MotionConfig } from 'framer-motion'

import { spring } from '~helpers/styles'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={250}>
      <MotionConfig transition={spring}>{children}</MotionConfig>
    </Tooltip.Provider>
  )
}
