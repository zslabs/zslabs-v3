import * as React from 'react'

import type { RecipeVariantProps } from '@css/css'
import { css, cva } from '@css/css'
import { Button as ButtonPrimitive } from 'react-aria-components'

import TextLink, { type TextLinkProps } from '@/components/text-link'

type ButtonVariants = RecipeVariantProps<typeof styles>
type ButtonProps = React.ComponentPropsWithRef<typeof ButtonPrimitive> &
  ButtonVariants
type ButtonLinkProps = TextLinkProps & ButtonVariants

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
    fontSize: 'md',
    fontWeight: 'medium',
    transitionProperty: 'scale',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',
    display: 'inline-grid',
    paddingInline: '4',

    _hover: {
      scale: '1.025',
      _active: {
        scale: '1',
      },
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
        backgroundColor: 'slate.12',
        borderWidth: '1',
        borderColor: 'black.a.3',
        borderStyle: 'solid',
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

export function ButtonLink({
  children,
  variation,
  iconOnly,
  loading,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <TextLink
      {...linkProps}
      className={styles({ variation, iconOnly, loading })}
    >
      <span className={buttonContentClass}>{children}</span>
    </TextLink>
  )
}
