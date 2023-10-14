import * as React from 'react'

import Icon from './Icon'

export type BlockquoteProps = React.HTMLAttributes<HTMLQuoteElement>

export default function Blockquote({ children, ...rest }: BlockquoteProps) {
  return (
    <blockquote
      {...rest}
      className="my-8 rounded-xl bg-overlay-8 p-4 font-mono"
    >
      <div className="text-lg">
        <Icon name="quote" />
      </div>
      <div className="mt-2">{children}</div>
    </blockquote>
  )
}
