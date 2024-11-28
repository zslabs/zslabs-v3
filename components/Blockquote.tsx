import * as React from 'react'

import Icon from './Icon'

import { css } from '~css/css'

export type BlockquoteProps = React.HTMLAttributes<HTMLQuoteElement>

export default function Blockquote({ children, ...rest }: BlockquoteProps) {
  return (
    <blockquote
      {...rest}
      className={css({
        marginBlock: '8',
        padding: '4',
        fontFamily: 'code',
        borderRadius: 'xl',
        backgroundColor: 'black.a.8',
      })}
      data-code
    >
      <div
        className={css({
          fontSize: 'lg',
        })}
      >
        <Icon name="quote" />
      </div>
      <div
        className={css({
          marginBlockStart: '2',
        })}
      >
        {children}
      </div>
    </blockquote>
  )
}
