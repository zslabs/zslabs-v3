import * as React from 'react'

import { css } from '@css/css'
import { mergeProps, useButton } from 'react-aria'
import {
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
} from 'react-aria-components'
import type { TooltipProps as TooltipPropsPrimitive } from 'react-aria-components'

interface TooltipProps extends Omit<TooltipPropsPrimitive, 'children'> {
  children: React.ReactNode
  content: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TriggerWrapper(props: any) {
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const { buttonProps } = useButton(props, triggerRef)

  return React.cloneElement(
    props.children,
    // eslint-disable-next-line react-hooks/refs
    mergeProps(buttonProps, props.children.props, { ref: triggerRef })
  )
}

export default function Tooltip({
  children,
  content,
  placement = 'bottom',
  ...rest
}: TooltipProps) {
  return (
    <TooltipTrigger delay={250} closeDelay={250} {...rest}>
      <TriggerWrapper>{children}</TriggerWrapper>
      <TooltipPrimitive
        placement={placement}
        offset={6}
        className={css({
          borderRadius: 'xl',
          backgroundColor: 'black.a.11',
          paddingInline: '3',
          paddingBlock: '1.5',
          color: 'slate.12',
          fontSize: 'sm',
          textAlign: 'center',
          borderWidth: '2',
          borderColor: 'black.a.11',
          borderStyle: 'solid',
          boxShadow: 'inset',

          '&[data-placement=top]': {
            animationName: 'slide-up-fade',
            animationDuration: 'fast',
            animationTimingFunction: 'default',
            animationFillMode: 'forwards',
          },
          '&[data-placement=bottom]': {
            animationName: 'slide-down-fade',
            animationDuration: 'fast',
            animationTimingFunction: 'default',
            animationFillMode: 'forwards',
          },
          '&[data-placement=right]': {
            animationName: 'slide-right-fade',
            animationDuration: 'fast',
            animationTimingFunction: 'default',
            animationFillMode: 'forwards',
          },
          '&[data-placement=left]': {
            animationName: 'slide-left-fade',
            animationDuration: 'fast',
            animationTimingFunction: 'default',
            animationFillMode: 'forwards',
          },
        })}
      >
        {content}
      </TooltipPrimitive>
    </TooltipTrigger>
  )
}
