import * as React from 'react'

import Icon from './Icon'

import type { ChildrenOnlyProps } from '~types/custom'

export type BlockquoteProps = ChildrenOnlyProps &
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>

const Blockquote: React.FC<BlockquoteProps> = ({ children, ...rest }) => {
  return (
    <blockquote
      className="relative my-8 rounded-xl border-2 border-slate-7 bg-slate-1 p-6"
      {...rest}
    >
      {children}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-7 bg-slate-1 p-2 ring-4 ring-slate-1">
        <Icon name="quote" />
      </div>
    </blockquote>
  )
}

export default Blockquote
