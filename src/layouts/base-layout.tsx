import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { useLocation } from '@tanstack/react-router'
import type { Transition, HTMLMotionProps, Variants } from 'framer-motion'
import { m } from 'framer-motion'

import Prose from '@/components/prose'
import TextLink from '@/components/text-link'
import Tooltip from '@/components/tooltip'
import { useLayoutAnimationSetDone } from '@/hooks/use-layout-animation-state'
import GitHub from '@/icons/github.svg?react'
import Logo from '@/icons/logo.svg?react'
import Peace from '@/icons/peace.svg?react'
import X from '@/icons/x.svg?react'
import Year from '@/layouts/components/year'
import type { ChildrenOnlyProps } from '@/types/custom'

interface HeaderItemWrapperProps {
  runAnimation: boolean
  custom: number
}

const headerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '-0.75rem',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

function HeaderItemWrapper({
  runAnimation,
  custom,
  ...rest
}: HeaderItemWrapperProps & HTMLMotionProps<'div'>) {
  const transition: Transition = {
    delay: custom * 0.25,
  }

  return (
    <m.div
      variants={headerItemVariants}
      initial={runAnimation ? 'hidden' : false}
      animate={runAnimation ? 'visible' : undefined}
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

const headerIconStyles = css({
  display: 'block',
  width: 'fit',
  borderRadius: 'full',
  backgroundLinear: 'to-b',
  gradientFrom: 'slate.2',
  gradientTo: 'slate.1',
  boxShadow: 'slate',
  padding: '2',
  borderWidth: '1',
  borderColor: 'slate.7',
  borderStyle: 'solid',
  fontSize: 'xl',
  color: 'slate.11',
  transitionProperty: 'color',
  transitionDuration: 'fast',
  transitionTimingFunction: 'default',

  _hover: {
    color: 'slate.12',
  },
})

export default function BaseLayout({ children }: ChildrenOnlyProps) {
  const location = useLocation()
  const setDone = useLayoutAnimationSetDone()

  const runAnimation = location.pathname === '/'

  return (
    <>
      <div
        className={css({
          marginInline: 'auto',
          maxWidth: '2xl',
          paddingBlock: '8',
          paddingInline: '4',

          md: {
            paddingBlock: '12',
          },
        })}
      >
        <header
          className={css({
            marginBlockEnd: '12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4',

            md: {
              marginBlockEnd: '16',
            },
          })}
        >
          <HeaderItemWrapper
            runAnimation={runAnimation}
            custom={1}
          >
            <TextLink
              href="/"
              aria-label="Home"
              className={css({
                position: 'relative',
                display: 'block',
                fontSize: '4.5xl',
              })}
            >
              <Logo />
            </TextLink>
          </HeaderItemWrapper>

          <div
            className={css({
              gap: '4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            })}
          >
            <HeaderItemWrapper
              runAnimation={runAnimation}
              custom={2}
            >
              <Tooltip content="GitHub">
                <TextLink
                  href="https://github.com/zslabs"
                  className={headerIconStyles}
                >
                  <GitHub />
                </TextLink>
              </Tooltip>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              custom={3}
            >
              <Tooltip content="Twitter">
                <TextLink
                  href="https://twitter.com/zslabs"
                  className={headerIconStyles}
                >
                  <X />
                </TextLink>
              </Tooltip>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              custom={4}
              onAnimationComplete={runAnimation ? setDone : undefined}
            >
              <Tooltip content="About me">
                <TextLink href="/#about">
                  <img
                    className={css({
                      borderRadius: 'full',
                      flexShrink: '0',
                    })}
                    src="/media/me.png"
                    width="36"
                    height="36"
                    alt="Zach Schnackel"
                  />
                </TextLink>
              </Tooltip>
            </HeaderItemWrapper>
          </div>
        </header>

        {children}

        <m.footer
          variants={footerVariants}
          initial={runAnimation ? 'hidden' : false}
          animate={runAnimation ? 'visible' : undefined}
          className={css({
            marginBlockStart: '12',
            color: 'slate.11',
            fontSize: 'sm',
            textAlign: 'center',

            md: {
              marginBlockStart: '16',
            },
          })}
        >
          <p
            className={css({
              marginBlockEnd: '1',
            })}
          >
            Copyright &copy; <Year /> Zach Schnackel{' '}
            <span
              className={css({
                color: 'slate.12',
              })}
            >
              <Peace className={inlineIcon()} />
            </span>
          </p>
          <Prose>
            <div
              className={css({
                justifyContent: 'center',
                gap: '2',
                display: 'flex',
              })}
            >
              <TextLink href="mailto:info@zslabs.com">Contact</TextLink> ::{' '}
              <TextLink href="/privacy">Privacy</TextLink> ::{' '}
              <TextLink href="/terms">Terms</TextLink>
            </div>
          </Prose>
        </m.footer>
      </div>
      <div
        className={css({
          pointerEvents: 'none',
          position: 'relative',
          isolation: 'isolate',
          zIndex: '-1',
        })}
      >
        <div
          className={css({
            position: 'fixed',
            inset: '0',
            opacity: '0.35',
            mixBlendMode: 'color-dodge',
            backgroundImage: 'ooorganize',
          })}
        />
        <div
          className={css({
            position: 'fixed',
            inset: '0',
            opacity: '0.3',
            transform: 'translate(25%, 50%)',
            backgroundPosition: '75%',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'gggyrate',
          })}
        />
      </div>
    </>
  )
}
