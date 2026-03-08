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
    fontSize: 'md',
    fontWeight: 'medium',
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
  },
  variants: {
    variation: {
      default: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.2',
        gradientTo: 'slate.1',
        borderWidth: '1',
        borderColor: 'slate.5',
        borderStyle: 'solid',
        boxShadow: 'slate',
        color: 'slate.11',

        _hover: {
          color: 'slate.12',
        },
      },
      contrast: {
        backgroundLinear: 'to-b',
        gradientFrom: 'slate.12',
        gradientTo: 'slate.11',
        color: 'slate.1',
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
        borderRadius: 'full',

        '& svg': {
          fontSize: 'xl',
        },
      },
      false: {
        borderRadius: 'xl',

        '& svg': {
          fontSize: 'lg',
        },
      },
    },
    glow: {
      default: {
        boxShadow: 'default',
      },
      contrast: {
        boxShadow: 'contrast',
      },
    },
  },
  defaultVariants: {
    variation: 'default',
    iconOnly: false,
    loading: false,
  },
})

export function Button({
  children,
  variation,
  iconOnly,
  glow,
  loading,
  ...buttonProps
}: ButtonProps) {
  return (
    <ButtonPrimitive
      {...buttonProps}
      className={styles({ variation, iconOnly, loading, glow })}
    >
      {(renderProps) => (
        <span className={buttonContentClass}>
          {typeof children === 'function' ? children(renderProps) : children}
        </span>
      )}
    </ButtonPrimitive>
  )
}
