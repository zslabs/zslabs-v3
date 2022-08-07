import * as React from 'react'

import Icon from './Icon'

import type { ChildrenOnlyProps } from '~types/custom'

export type BlockquoteProps = ChildrenOnlyProps &
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>

const Blockquote: React.FC<BlockquoteProps> = ({ children, ...rest }) => {
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

export default Blockquote
