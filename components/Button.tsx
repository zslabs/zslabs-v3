import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'

interface ButtonPropsPrimitive<T extends React.ElementType> {
  as?: T
  variation?: 'default' | 'contrast'
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
          relative inline-block h-9 overflow-hidden rounded-full text-sm font-semibold duration-150 focus:outline-none hocus:scale-105

          ${
            variation === 'default' &&
            `bg-overlay-8 shadow-button-default hocus:bg-overlay-10`
          }
          ${
            variation === 'contrast' &&
            'bg-slate-12 text-slate-1 shadow-button-contrast'
          }
          ${loading && `pointer-events-none opacity-50`}
          ${iconOnly ? 'w-9' : 'px-4'}
        `)}
    >
      <span
        className={ctl(`
            relative z-10 grid h-full grid-flow-col place-items-center gap-2 whitespace-nowrap

            ${iconOnly ? 'auto-cols-auto' : 'auto-cols-min'}
          `)}
      >
        {children}
      </span>
    </Component>
  )
}

export default Button
