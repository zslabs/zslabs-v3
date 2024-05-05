'use client'

import * as React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { css } from '~css/css'

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
            sideOffset={6}
            className={css({
              borderRadius: 'lg',
              backgroundColor: 'black.a.11',
              paddingInline: '3',
              paddingBlock: '1.5',
              color: 'slate.12',
              fontSize: 'sm',
              textAlign: 'center',

              '&[data-side=bottom]': {
                animation: 'slide-up-fade',
              },
              '&[data-side=top]': {
                animation: 'slide-down-fade',
              },
              '&[data-side=left]': {
                animation: 'slide-right-fade',
              },
              '&[data-side=right]': {
                animation: 'slide-left-fade',
              },
            })}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  }
)

export default Tooltip
