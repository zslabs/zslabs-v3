import { MotionConfig } from 'framer-motion'

import { spring } from '@/helpers/styles'
import { LayoutAnimationProvider } from '@/hooks/use-layout-animation-state'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig transition={spring}>
      <LayoutAnimationProvider>{children}</LayoutAnimationProvider>
    </MotionConfig>
  )
}
