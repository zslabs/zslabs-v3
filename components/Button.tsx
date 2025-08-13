'use client'

import * as React from 'react'

import { Button as ButtonPrimitive } from 'react-aria-components'
import type { ButtonProps as ButtonPropsPrimitive } from 'react-aria-components'

import type { RecipeVariantProps } from '@css/css'
import { css, cva } from '@css/css'

type ButtonVariants = RecipeVariantProps<typeof styles> & {
  children: React.ReactNode
}

type ButtonProps = ButtonPropsPrimitive & ButtonVariants

const styles = cva({
  base: {
    position: 'relative',
    height: '10',
    overflow: 'hidden',
    borderRadius: 'xl',
    fontSize: 'sm',
    fontWeight: 'medium',
    outlineStyle: 'dotted',
    outlineColor: 'transparent',
    outlineOffset: '0.5',
    outlineWidth: '1',
    transitionProperty: 'all',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    display: 'inline-grid',
    paddingInline: '4',
    willChange: 'transform',

    _after: {
      '--stroke': '94.892% .00288 264.626',
      '--border': 1,
      '--bg-size': 'calc(100% + (2px * var(--border)))',
      '--alpha': 0,
      '--gradient':
        'linear-gradient(to bottom right, oklch(var(--stroke) / 0.125), oklch(var(--stroke) / 0.0625))',
      content: '""',
      pointerEvents: 'none',
      position: 'absolute',
      inset: '0',
      background:
        // eslint-disable-next-line
        'var(--gradient) center center / var(--bg-size) var(--bg-size)',
      borderRadius: 'xl',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      maskImage:
        'linear-gradient(hsl(0 0% 100% / var(--alpha)), hsl(0 0% 100% / var(--alpha))), linear-gradient(hsl(0 0% 100%), hsl(0 0% 100%))',
      maskClip: 'padding-box, border-box',
      maskComposite: 'intersect',
    },

    _hover: {
      scale: '1.05',
      outlineColor: 'white.a.4',
    },

    _active: {
      scale: '1',
    },
  },
  variants: {
    variation: {
      default: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.2',
        gradientTo: 'slate.1',
        boxShadow: 'default',
      },
      contrast: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.12',
        gradientTo: 'slate.11',
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

export function Button({
  children,
  variation,
  iconOnly,
  loading,
  ref,
  ...rest
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <ButtonPrimitive
      {...rest}
      className={styles({ variation, iconOnly, loading })}
      ref={ref}
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
    </ButtonPrimitive>
  )
}

export function DivButton({
  children,
  variation,
  iconOnly,
  loading,
  ref,
  ...rest
}: ButtonVariants & {
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      {...rest}
      className={styles({ variation, iconOnly, loading })}
      ref={ref}
    >
      <span
        className={css({
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
    </div>
  )
}
