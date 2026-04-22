import * as React from 'react'

import { css, cx } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { m } from 'framer-motion'

import Prose from './prose'

import { Badge } from '@/components/badge'
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
                  color: 'slate.12',
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
            <span
              className={css({
                color: 'slate.12',
              })}
            >
              {label}
            </span>
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
                marginBlockStart: '2',
              })}
            >
              <Badge>
                {meta.map((item, index) => (
                  <React.Fragment key={index}>
                    {item}
                    {index !== meta.length - 1 && (
                      <span className={css({ color: 'slate.8' })}>/</span>
                    )}
                  </React.Fragment>
                ))}
              </Badge>
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
  poster,
  comingSoon,
}: {
  label: React.ReactNode
  meta?: string[]
  children?: React.ReactNode
  to: TextLinkProps['to']
  params?: TextLinkProps['params']
  icon?: React.ReactNode
  poster?: string
  comingSoon?: boolean
}) {
  const Component = React.useMemo(() => {
    if (comingSoon) {
      return 'div'
    }

    return TextLink
  }, [comingSoon])

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
        <Component
          to={comingSoon ? undefined : to}
          params={comingSoon ? undefined : params}
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
            {poster && (
              <div
                className={css({
                  position: 'relative',
                  margin: '-2',
                })}
              >
                <img
                  src={poster}
                  alt=""
                  className={css({
                    borderRadius: 'lg',
                    display: 'block',
                    aspectRatio: 'wide',
                    objectFit: 'cover',
                    overflow: 'hidden',
                    marginBottom: '2',
                    filter: comingSoon ? 'grayscale' : undefined,
                  })}
                />
                {comingSoon && (
                  <div
                    className={css({
                      position: 'absolute',
                      insetBlockEnd: '4',
                      insetInlineEnd: '2',
                    })}
                  >
                    <Badge variation="contrast">Coming soon</Badge>
                  </div>
                )}
              </div>
            )}
            <span
              className={css({
                color: 'slate.12',
                textDecorationLine: comingSoon ? undefined : 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: '4',
                transitionProperty: 'textUnderlineOffset',
                transitionDuration: 'fast',
                transitionTimingFunction: 'default',
                fontSize: 'lg',
                fontWeight: 'medium',
                textWrap: 'balance',

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

          {meta && (
            <div>
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
            </div>
          )}
        </Component>
      </div>
    </m.li>
  )
}
