import { stack } from '@css/patterns'
import { m } from 'framer-motion'

import { fadeInUp } from '@/helpers/styles'
import { useLayoutAnimationDone } from '@/hooks/use-layout-animation-state'

export default function HomepageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const done = useLayoutAnimationDone()

  return (
    <m.div
      className={stack({
        gap: '12',
        md: {
          gap: '16',
        },
      })}
      initial="offscreen"
      variants={fadeInUp}
      animate={done ? 'onscreen' : 'offscreen'}
    >
      {children}
    </m.div>
  )
}
