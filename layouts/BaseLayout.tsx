'use client'

import * as React from 'react'

import type {
  AnimationControls,
  AnimationProps,
  HTMLMotionProps,
  Variants,
} from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import Icon from '~components/Icon'
import Prose from '~components/Prose'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'
import useLayoutAnimationState from '~hooks/useLayoutAnimationState'
import Year from '~layouts/components/Year'
import type { ChildrenOnlyProps } from '~types/custom'

interface HeaderItemWrapperProps {
  runAnimation: boolean
  controls: AnimationControls
  custom: number
}

function HeaderItemWrapper({
  runAnimation,
  controls,
  custom,
  ...rest
}: HeaderItemWrapperProps & HTMLMotionProps<'div'>) {
  const variants: Variants = React.useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: '-0.75rem',
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

export default function BaseLayout({ children }: ChildrenOnlyProps) {
  const pathname = usePathname()
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
  }, [controls, setDone, runAnimation])

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <header className="mb-12 flex items-center justify-between gap-6 md:mb-16">
          <HeaderItemWrapper
            runAnimation={runAnimation}
            controls={controls}
            custom={1}
          >
            <TextLink
              href="/"
              aria-label="Home"
              className="group relative text-3xl"
            >
              <Icon name="logo" />
              <div className="pointer-events-none absolute left-0 top-0 -z-1 rotate-12 opacity-0 blur-xl transition-opacity duration-150 group-hover:opacity-80">
                <Icon name="logo" />
              </div>
            </TextLink>
          </HeaderItemWrapper>

          <div className="flex items-center justify-end gap-6">
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={2}
            >
              <Tooltip content="GitHub">
                <TextLink
                  href="https://github.com/zslabs"
                  className="text-xl text-slate-11 transition-colors hocus:text-slate-12"
                >
                  <Icon name="github" />
                </TextLink>
              </Tooltip>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={3}
            >
              <Tooltip content="Twitter">
                <TextLink
                  href="https://twitter.com/zslabs"
                  className="text-xl text-slate-11 transition-colors hocus:text-slate-12"
                >
                  <Icon name="x" />
                </TextLink>
              </Tooltip>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              controls={controls}
              custom={4}
            >
              <Tooltip content="About me">
                <TextLink href="/#about">
                  <Image
                    className="shrink-0 rounded-[33%]"
                    src="/media/me.png"
                    width="40"
                    height="40"
                    alt="Zach Schnackel"
                  />
                </TextLink>
              </Tooltip>
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
          <p className="mb-1">
            Copyright &copy; <Year /> Zach Schnackel{' '}
            <span className="text-slate-12">
              <Icon name="peace" inline />
            </span>
          </p>
          <Prose>
            <div className="flex justify-center gap-2">
              <TextLink href="mailto:info@zslabs.com">Contact</TextLink> ::{' '}
              <TextLink href="/privacy">Privacy</TextLink> ::{' '}
              <TextLink href="/terms">Terms</TextLink>
            </div>
          </Prose>
        </motion.footer>
      </div>
      <div className="pointer-events-none relative isolate -z-1 opacity-30">
        <div className="fixed inset-0 mix-blend-color-dodge nnnoise" />
        <div className="fixed inset-0 bg-center mix-blend-color-dodge ooorganize" />
        <div className="fixed inset-0 translate-x-1/4 translate-y-1/2 bg-right bg-no-repeat gggyrate" />
      </div>
    </>
  )
}
