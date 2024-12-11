import * as React from 'react'

import { Button as ButtonPrimitive } from 'react-aria-components'
import type { ButtonProps as ButtonPropsPrimitive } from 'react-aria-components'

import type { RecipeVariantProps } from '~css/css'
import { css, cva } from '~css/css'

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

export function Button({
  children,
  variation,
  isDisabled,
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
