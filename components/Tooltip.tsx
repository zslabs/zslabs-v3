'use client'

import * as React from 'react'

import { mergeProps, useButton } from 'react-aria'
import {
  Tooltip as TooltipPrimitive,
  TooltipTrigger,
} from 'react-aria-components'
import type { TooltipProps as TooltipPropsPrimitive } from 'react-aria-components'

import { css } from '@css/css'

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
            animation: 'slide-up-fade',
          },
          '&[data-placement=bottom]': {
            animation: 'slide-down-fade',
          },
          '&[data-placement=right]': {
            animation: 'slide-right-fade',
          },
          '&[data-placement=left]': {
            animation: 'slide-left-fade',
          },
        })}
      >
        {content}
      </TooltipPrimitive>
    </TooltipTrigger>
  )
}
