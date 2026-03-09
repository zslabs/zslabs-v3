import * as React from 'react'

import { css, cx } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { m } from 'framer-motion'

import Prose from './prose'

import type { TextLinkProps } from '@/components/text-link'
import TextLink from '@/components/text-link'
import { fadeInUp, viewportInViewOptions } from '@/helpers/styles'
import ArrowDown from '@/icons/arrow-down.svg?react'

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
  to,
  params,
  meta,
  icon,
  mono,
}: {
  label: React.ReactNode
  meta?: string[]
  children?: React.ReactNode
  to?: TextLinkProps['to']
  params?: TextLinkProps['params']
  icon?: React.ReactNode
  mono?: boolean
}) {
  return (
    <m.li
      className={css({
        display: 'flex',
        gap: '4',
        flexDirection: 'column',

        sm: {
          flexDirection: 'row',
        },
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
            borderWidth: '1',
            borderColor: 'slate.7',
            borderStyle: 'solid',
            fontSize: 'xl',
            width: '10',
            height: '10',
            display: 'grid',
            placeContent: 'center',
            flexShrink: '0',
          })}
        >
          {icon}
        </div>
      )}
      <div>
        <div
          className={css({
            marginBlockEnd: '1',
            fontWeight: 'medium',
            fontSize: 'lg',
          })}
        >
          {to ? (
            <TextLink
              className={cx(
                'group',
                css({
                  display: 'flex',
                  gap: '1',
                  alignItems: 'baseline',
                  width: 'fit',
                })
              )}
              to={to}
              params={params}
            >
              <span
                className={css({
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'dotted',
                  textUnderlineOffset: '4',
                  transitionProperty: 'textUnderlineOffset',
                  transitionDuration: 'fast',
                  transitionTimingFunction: 'default',
                  ...(mono
                    ? {
                        fontFamily: 'mono',
                      }
                    : {}),
                  _groupHover: {
                    textUnderlineOffset: '6',
                  },
                })}
              >
                {label}
              </span>
              {!to?.startsWith('/') && (
                <div
                  className={css({
                    lineHeight: 'none',
                    color: 'slate.11',
                    transitionProperty: 'transform',
                    transitionDuration: 'fast',
                    transitionTimingFunction: 'default',
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
                borderWidth: '1',
                borderColor: 'slate.3',
                borderRadius: 'full',
                textStyle: 'mono',
                textTransform: 'uppercase',
                letterSpacing: 'normal',
                backgroundColor: 'black.a.6',
                width: 'fit',
                paddingInline: '3',
                paddingBlock: '0.5',
                marginBlockStart: '2',
                display: 'flex',
                gap: '2',
              })}
              data-code
            >
              {meta.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index !== meta.length - 1 && (
                    <span className={css({ color: 'slate.8' })}>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </m.li>
  )
}

export function BoxListItem({
  label,
  children,
  to,
  params,
  meta,
}: {
  label: React.ReactNode
  meta?: string[]
  children?: React.ReactNode
  to: TextLinkProps['to']
  params?: TextLinkProps['params']
  icon?: React.ReactNode
}) {
  return (
    <m.li
      initial="offscreen"
      whileInView="onscreen"
      variants={fadeInUp}
      viewport={viewportInViewOptions}
    >
      <div
        className={css({
          height: 'full',
        })}
      >
        <TextLink
          to={to}
          params={params}
          className={cx(
            'group',
            css({
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
            })
          )}
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
                fontSize: 'lg',
                fontWeight: 'medium',

                _groupHover: {
                  textUnderlineOffset: '6',
                },
              })}
            >
              {label}
            </span>
            {children && (
              <Prose>
                <p
                  className={css({
                    color: 'slate.11',
                  })}
                >
                  {children}
                </p>
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
                  display: 'flex',
                  gap: '2',
                })}
                data-code
              >
                {meta.map((item, index) => (
                  <React.Fragment key={index}>
                    {item}
                    {index !== meta.length - 1 && (
                      <span className={css({ color: 'slate.8' })}>/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </TextLink>
      </div>
    </m.li>
  )
}
