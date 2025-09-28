'use client'

import * as React from 'react'

import { motion } from 'framer-motion'

import Prose from './Prose'

import { Tilt } from '@/components/motion-primitives/tilt'
import TextLink from '@/components/TextLink'
import { fadeInUp, viewportInViewOptions } from '@/helpers/styles'
import ArrowDown from '@/icons/arrow-down.svg'
import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className={css({
        display: 'grid',
        gap: '6',
        gridTemplateColumns: '1',
      })}
    >
      {children}
    </ul>
  )
}

export function BoxList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className={css({
        display: 'grid',
        gap: '6',
        gridTemplateColumns: '1',

        md: {
          gridTemplateColumns: '2',
        },
      })}
    >
      {children}
    </ul>
  )
}

export function ListItem({
  label,
  children,
  href,
  meta,
  icon,
}: {
  label: React.ReactNode
  meta?: React.ReactNode
  children?: React.ReactNode
  href?: string
  icon?: React.ReactNode
}) {
  return (
    <motion.li
      className={css({
        display: 'flex',
        gap: '4',
      })}
      initial="offscreen"
      whileInView="onscreen"
      variants={fadeInUp}
      viewport={viewportInViewOptions}
    >
      {icon && (
        <div
          className={css({
            position: 'relative',
            alignSelf: 'start',
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
          })}
        >
          {icon}
        </div>
      )}
      <div>
        <div
          className={css({
            marginBlockEnd: '1',
          })}
        >
          {href ? (
            <TextLink
              className={`group ${css({
                display: 'flex',
                gap: '1',
                alignItems: 'baseline',
                width: 'fit',
              })}`}
              href={href}
            >
              <span
                className={css({
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'dotted',
                  textUnderlineOffset: '4',
                  transitionProperty: 'textUnderlineOffset',
                  transitionDuration: 'fast',
                  transitionTimingFunction: 'default',
                  willChange: 'transform',
                  _groupHover: {
                    textUnderlineOffset: '6',
                  },
                })}
              >
                {label}
              </span>
              {!href?.startsWith('/') && (
                <div
                  className={css({
                    fontSize: 'lg',
                    lineHeight: 'none',
                    color: 'slate.11',
                    transitionProperty: 'transform',
                    transitionDuration: 'fast',
                    transitionTimingFunction: 'default',
                    willChange: 'transform',
                    transform: 'rotate(-135deg)',

                    _groupHover: {
                      transform: 'translateY(0.075rem) rotate(-90deg)',
                    },
                  })}
                >
                  <ArrowDown className={inlineIcon()} />
                </div>
              )}
            </TextLink>
          ) : (
            <span>{label}</span>
          )}
        </div>
        <div>
          {children && (
            <Prose>
              <p>{children}</p>
            </Prose>
          )}
          {meta && (
            <div
              className={css({
                color: 'slate.11',
                fontSize: 'sm',
                borderRadius: 'md',
                textStyle: 'mono',
                textTransform: 'uppercase',
                letterSpacing: 'normal',
                backgroundColor: 'black.a.6',
                width: 'fit',
                paddingInline: '2',
                paddingBlock: '1',
                marginBlockStart: '2',
              })}
              data-code
            >
              {meta}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}

export function BoxListItem({
  label,
  children,
  href,
  meta,
}: {
  label: React.ReactNode
  meta?: string
  children?: React.ReactNode
  href: string
  icon?: React.ReactNode
}) {
  return (
    <motion.li
      initial="offscreen"
      whileInView="onscreen"
      variants={fadeInUp}
      viewport={viewportInViewOptions}
    >
      <Tilt
        isRevese
        rotationFactor={6}
        className={css({
          height: 'full',
        })}
      >
        <TextLink
          href={href}
          className={`group ${css({
            borderWidth: '1',
            borderColor: 'slate.a.5',
            borderRadius: 'xl',
            padding: '4',
            outlineWidth: '4',
            outlineStyle: 'solid',
            outlineColor: 'slate.a.2',
            backgroundLinear: 'to-b',
            gradientFrom: 'slate.a.1',
            gradientTo: 'slate.a.2',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            gap: '3',
            height: 'full',
          })}`}
        >
          <div
            className={css({
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <span
              className={css({
                textDecorationLine: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: '4',
                transitionProperty: 'textUnderlineOffset',
                transitionDuration: 'fast',
                transitionTimingFunction: 'default',
                _groupHover: {
                  textUnderlineOffset: '6',
                },
              })}
            >
              {label}
            </span>
            {children && (
              <Prose>
                <p>{children}</p>
              </Prose>
            )}
          </div>
          <div>
            {meta && (
              <div
                className={css({
                  fontSize: 'sm',
                  textStyle: 'mono',
                  textTransform: 'uppercase',
                  letterSpacing: 'normal',
                })}
                data-code
              >
                {meta}
              </div>
            )}
          </div>
        </TextLink>
      </Tilt>
    </motion.li>
  )
}
