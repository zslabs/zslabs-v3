import * as React from 'react'

import type {
  AnimationControls,
  AnimationProps,
  HTMLMotionProps,
  Variants,
} from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Icon from '~components/Icon'
import TextLink from '~components/TextLink'
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
        y: '-0.5rem',
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
    y: '0.5rem',
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
      <div className="pointer-events-none fixed inset-0 -z-1 mix-blend-color-dodge nnnoise" />
      <div className="pointer-events-none fixed inset-0 -z-1 bg-center opacity-30 mix-blend-color-dodge ooorganize" />

      <div className="mx-auto max-w-[calc(65ch+2rem)] px-4 py-8 md:py-12">
        <header className="mb-12 flex items-center justify-between gap-6 md:mb-16">
          <HeaderItemWrapper
            runAnimation={runAnimation}
            controls={controls}
            custom={1}
          >
            <TextLink href="/" className="text-3xl">
              <Icon name="logo" />
            </TextLink>
          </HeaderItemWrapper>

          <div className="flex items-center justify-end gap-6">
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={2}
            >
              <TextLink
                href="https://github.com/zslabs"
                className="text-xl text-slate-11 transition-colors hocus:text-slate-12"
              >
                <Icon name="github" />
              </TextLink>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={3}
            >
              <TextLink
                href="https://twitter.com/zslabs"
                className="text-xl text-slate-11 transition-colors hocus:text-slate-12"
              >
                <Icon name="twitter" />
              </TextLink>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={4}
            >
              <TextLink href="/#about">
                <Image
                  className="shrink-0 rounded-full"
                  src="/media/me.png"
                  width="32px"
                  height="32px"
                  alt="Zach Schnackel"
                />
              </TextLink>
            </HeaderItemWrapper>
          </div>
        </header>

        {children}

        <motion.footer
          animate={controls}
          variants={footerVariants}
          initial={runAnimation ? 'hidden' : false}
          className="mt-12 text-center text-sm text-slate-11 md:mt-16"
        >
          Copyright &copy; {new Date().getFullYear()} Zach Schnackel{' '}
          <span className="text-slate-12">
            <Icon name="peace" inline />
          </span>
        </motion.footer>
      </div>
    </>
  )
}

export default BaseLayout