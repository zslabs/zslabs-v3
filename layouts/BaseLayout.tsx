import * as React from 'react'

import type {
  AnimationControls,
  AnimationProps,
  HTMLMotionProps,
  Variants,
} from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'

import useLayoutAnimationState from '~hooks/useLayoutAnimationState'
import type { ChildrenOnlyProps } from '~types/custom'

interface HeaderItemWrapperProps {
  runAnimation: boolean
  controls: AnimationControls
  custom: number
}

const HeaderItemWrapper: React.FC<
  HeaderItemWrapperProps & HTMLMotionProps<'div'>
> = ({ runAnimation, controls, custom, ...rest }) => {
  const variants: Variants = React.useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: '-2rem',
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    }),
    []
  )

  const transition: AnimationProps['transition'] = React.useMemo(
    () => ({
      delay: custom * 0.25,
    }),
    [custom]
  )

  return (
    <motion.div
      animate={controls}
      variants={variants}
      initial={runAnimation ? 'hidden' : false}
      transition={transition}
      {...rest}
    />
  )
}

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '2rem',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const BaseLayout: React.FC<ChildrenOnlyProps> = ({ children }) => {
  const { pathname } = useRouter()
  const controls = useAnimation()
  const setDone = useLayoutAnimationState((state) => state.setDone)

  const runAnimation = pathname === '/'

  React.useEffect(() => {
    async function runAnimationFunc(): Promise<void> {
      await controls.start('visible')

      setDone()
    }

    if (runAnimation) {
      runAnimationFunc()
    }
  }, [controls, pathname, setDone, runAnimation])

  return (
    <>
      <HeaderItemWrapper
        runAnimation={runAnimation}
        controls={controls}
        custom={1}
        className="justify-self-start"
      >
        logo
      </HeaderItemWrapper>
      <HeaderItemWrapper
        runAnimation={runAnimation}
        controls={controls}
        custom={2}
      >
        thing
      </HeaderItemWrapper>

      {children}
      <motion.footer
        animate={controls}
        variants={footerVariants}
        initial={runAnimation ? 'hidden' : false}
      >
        footer stuff
      </motion.footer>
    </>
  )
}

export default BaseLayout
