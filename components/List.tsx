'use client'

import * as React from 'react'

import { motion } from 'framer-motion'

import Icon from './Icon'
import Prose from './Prose'

import TextLink from '~components/TextLink'
import { css } from '~css/css'
import { fadeInUp, viewportInViewOptions } from '~helpers/styles'
import type { IconName } from '~icons/build/types'

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
  meta?: string
  children?: React.ReactNode
  href?: string
  icon?: IconName
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
            backgroundColor: 'black.a.8',
            padding: '1',
            fontSize: 'xl',
          })}
        >
          <Icon name={icon} />
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
                  transitionProperty: 'all',
                  transitionDuration: 'fast',
                  transitionTimingFunction: 'default',
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
                  <Icon name="arrow-down" inline />
                </div>
              )}
            </TextLink>
          ) : (
            <span>{label}</span>
          )}
        </div>
        <div>
          {children && <Prose>{children}</Prose>}
          {meta && (
            <div
              className={css({
                color: 'slate.12',
                fontSize: 'sm',
                borderRadius: 'sm',
                fontFamily: 'code',
                textTransform: 'uppercase',
                letterSpacing: 'normal',
                backgroundColor: 'black.a.8',
                width: 'fit',
                paddingInline: '2',
                paddingBlock: '1',
                marginBlockStart: '2',
              })}
            >
              {meta}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}

const TextLinkMotion = motion(TextLink)

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
  icon?: IconName
}) {
  return (
    <TextLinkMotion
      href={href}
      className={`group ${css({
        borderWidth: '1',
        borderColor: 'slate.a.5',
        borderRadius: 'lg',
        padding: '4',
        outlineWidth: '4',
        outlineStyle: 'solid',
        outlineColor: 'slate.a.2',
        backgroundGradient: 'to-b',
        gradientFrom: 'slate.a.1',
        gradientTo: 'slate.a.2',
        boxShadow: 'sm',
        display: 'flex',
        flexDirection: 'column',
        gap: '3',
      })}`}
      initial="offscreen"
      whileInView="onscreen"
      variants={fadeInUp}
      viewport={viewportInViewOptions}
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
            transitionProperty: 'all',
            transitionDuration: 'fast',
            transitionTimingFunction: 'default',
            _groupHover: {
              textUnderlineOffset: '6',
            },
          })}
        >
          {label}
        </span>
        {children && <Prose>{children}</Prose>}
      </div>
      <div>
        {meta && (
          <div
            suppressHydrationWarning
            className={css({
              fontSize: 'sm',
              fontFamily: 'code',
              textTransform: 'uppercase',
              letterSpacing: 'normal',
            })}
          >
            {meta}
          </div>
        )}
      </div>
    </TextLinkMotion>
  )
}
