import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { useLocation } from '@tanstack/react-router'
import type { Transition, HTMLMotionProps, Variants } from 'framer-motion'
import { m } from 'framer-motion'

import { Button } from '@/components/button'
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
          position: 'relative',

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
          <HeaderItemWrapper runAnimation={runAnimation} custom={1}>
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
            <HeaderItemWrapper runAnimation={runAnimation} custom={2}>
              <TextLink href="https://github.com/zslabs" title="GitHub">
                <Button iconOnly render={(props) => <span {...props} />}>
                  <GitHub />
                </Button>
              </TextLink>
            </HeaderItemWrapper>
            <HeaderItemWrapper runAnimation={runAnimation} custom={3}>
              <TextLink href="https://twitter.com/zslabs" title="Twitter">
                <Button iconOnly render={(props) => <span {...props} />}>
                  <X />
                </Button>
              </TextLink>
            </HeaderItemWrapper>
            <HeaderItemWrapper
              runAnimation={runAnimation}
              custom={4}
              onAnimationComplete={runAnimation ? setDone : undefined}
            >
              <Tooltip content="About me">
                <TextLink
                  href="/#about"
                  className={css({
                    display: 'block',
                    width: 'fit',
                    transitionProperty: 'scale',
                    transitionDuration: 'fast',
                    transitionTimingFunction: 'default',

                    _hover: {
                      scale: '1.025',
                    },

                    _active: {
                      scale: '1',
                    },
                  })}
                >
                  <img
                    className={css({
                      borderRadius: 'full',
                      flexShrink: '0',
                    })}
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
      </div>
    </>
  )
}
