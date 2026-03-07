import * as React from 'react'

import type { RecipeVariantProps } from '@css/css'
import { css, cva } from '@css/css'
import { Button as ButtonPrimitive } from 'react-aria-components'

type ButtonVariants = RecipeVariantProps<typeof styles>
type ButtonProps = React.ComponentPropsWithRef<typeof ButtonPrimitive> &
  ButtonVariants

const buttonContentClass = css({
  position: 'relative',
  zIndex: '10',
  display: 'flex',
  height: 'full',
  placeContent: 'center',
  placeItems: 'center',
  gap: '2',
  whiteSpace: 'nowrap',
})

const styles = cva({
  base: {
    position: 'relative',
    height: '10',
    overflow: 'hidden',
    borderRadius: 'xl',
    fontSize: 'md',
    fontWeight: 'medium',
    outlineStyle: 'dotted',
    outlineColor: 'transparent',
    outlineOffset: '0.5',
    outlineWidth: '1',
    transitionProperty: 'scale',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    display: 'inline-grid',
    paddingInline: '4',

    _hover: {
      scale: '1.025',
    },

    _active: {
      scale: '1',
    },

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
  },
  variants: {
    variation: {
      default: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.2',
        gradientTo: 'slate.1',
        boxShadow: 'default',
      },
      secondary: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.2',
        gradientTo: 'slate.1',
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
  compoundVariants: [
    {
      variation: ['default', 'contrast'],
      css: {
        _hover: {
          outlineColor: 'white.a.4',
        },
      },
    },
  ],
})

export function Button({
  children,
  variation,
  iconOnly,
  loading,
  ...buttonProps
}: ButtonProps) {
  return (
    <ButtonPrimitive
      {...buttonProps}
      className={styles({ variation, iconOnly, loading })}
    >
      {(renderProps) => (
        <span className={buttonContentClass}>
          {typeof children === 'function' ? children(renderProps) : children}
        </span>
      )}
    </ButtonPrimitive>
  )
}
