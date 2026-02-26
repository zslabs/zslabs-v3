import { LazyMotion, MotionConfig, domMax } from 'framer-motion'

import { spring } from '@/helpers/styles'
import { LayoutAnimationProvider } from '@/hooks/use-layout-animation-state'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      <MotionConfig transition={spring}>
        <LayoutAnimationProvider>{children}</LayoutAnimationProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
