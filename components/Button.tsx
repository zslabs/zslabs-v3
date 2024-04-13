import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'

import type { RecipeVariantProps } from '~css/css'
import { css, cva } from '~css/css'

type ButtonVariants = RecipeVariantProps<typeof styles>

interface ButtonPropsPrimitive<T extends React.ElementType> {
  as?: T
  type?: 'submit' | 'button' | 'reset'
  children?: React.ReactNode
}

const styles = cva({
  base: {
    position: 'relative',
    height: '10',
    overflow: 'hidden',
    borderRadius: 'lg',
    fontSize: 'sm',
    fontWeight: 'medium',
    outlineStyle: 'dotted',
    outlineColor: 'transparent',
    outlineOffset: '0.5',
    transitionProperty: 'all',
    transitionDuration: 'fast',
    display: 'inline-grid',
    paddingInline: '4',

    _hover: {
      transform: 'scale(1.05)',
      outlineColor: 'white.a.4',
    },
  },
  variants: {
    variation: {
      default: {
        backgroundColor: 'black.a.8',
        boxShadow: 'default',

        _hover: {
          backgroundColor: 'black.a.10',
        },
      },
      contrast: {
        backgroundColor: 'slate.12',
        color: 'slate.1',
        boxShadow: 'contrast',
      },
    },
    loading: {
      true: {
        cursor: 'wait',
        pointerEvents: 'none',
        opacity: '50',
      },
    },
    iconOnly: {
      true: {
        width: '10',
        paddingInline: '0',
      },
    },
  },
})

function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  variation = 'default',
  iconOnly,
  loading,
  ...rest
}: ButtonVariants &
  ButtonPropsPrimitive<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonPropsPrimitive<T>>) {
  const Component = as || 'button'

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      {...rest}
      className={styles({ variation, iconOnly, loading })}
    >
      <span
        className={css({
          position: 'relative',
          zIndex: '10',
          display: 'flex',
          height: 'full',
          placeContent: 'center',
          placeItems: 'center',
          gap: '2',
          whiteSpace: 'nowrap',
        })}
      >
        {children}
      </span>
    </Component>
  )
}

export default Button
