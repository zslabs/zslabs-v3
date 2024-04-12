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
                  _hover: {
                    textUnderlineOffset: '6',
                  },
                })}
              >
                {label}
              </span>
              {!href?.startsWith('/') && (
                <div className="rotate-[-135deg] text-lg leading-none text-slate-11 transition-transform duration-200 ease-in-out will-change-transform group-hocus:translate-x-0.5 group-hocus:translate-y-[0.075rem] group-hocus:-rotate-90">
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
