import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'

interface ButtonPropsPrimitive<T extends React.ElementType> {
  as?: T
  variation?: 'default' | 'contrast' | 'overlay-hover' | 'cta'
  loading?: boolean
  iconOnly?: boolean
  type?: 'submit' | 'button' | 'reset'
  children?: React.ReactNode
}

function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  variation = 'default',
  iconOnly,
  loading,
  ...rest
}: ButtonPropsPrimitive<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonPropsPrimitive<T>>) {
  const Component = as || 'button'

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      {...rest}
      className={ctl(`
          relative h-9 overflow-hidden rounded-full text-sm font-semibold duration-150 focus:outline-none hocus:scale-105

          ${Component === 'button' ? 'inline-block' : 'inline-grid'}

          ${
            variation === 'default' &&
            `bg-overlay-8 shadow-button-default hocus:bg-overlay-10`
          }
          ${
            variation === 'contrast' &&
            'bg-slate-12 text-slate-1 shadow-button-contrast'
          }
          ${
            variation === 'overlay-hover' &&
            'shadow-button-overlay-contrast hocus:bg-overlay-8'
          }
          ${
            variation === 'cta' &&
            'bg-gradient-to-br from-primary-9 to-primary-8 text-primary-12 shadow-button-cta'
          }

          ${loading && `pointer-events-none opacity-50`}
          ${iconOnly ? 'w-9' : 'px-4'}
        `)}
    >
      <span
        className={ctl(`
            relative z-10 flex h-full place-content-center place-items-center gap-2 whitespace-nowrap
          `)}
      >
        {children}
      </span>
    </Component>
  )
}

export default Button
