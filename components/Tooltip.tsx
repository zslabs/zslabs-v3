'use client'

import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  align?: TooltipPrimitive.TooltipContentProps['align']
  content: React.ReactNode
  side?: TooltipPrimitive.TooltipContentProps['side']
}

const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  ({ align = 'center', children, content, side = 'bottom' }, forwardedRef) => {
    return (
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger ref={forwardedRef} asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={2}
            className={ctl(`
              z-50 max-w-[240px] rounded-lg bg-overlay-11 px-3

              py-2 text-center text-sm text-slate-12
              rdx-side-bottom:animate-slide-up-fade
              rdx-side-left:animate-slide-right-fade
              rdx-side-right:animate-slide-left-fade
              rdx-side-top:animate-slide-down-fade
            `)}
          >
            {content}
            <TooltipPrimitive.Arrow
              width={12}
              height={6}
              offset={8}
              className={ctl(`fill-overlay-11`)}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  }
)

export default Tooltip
