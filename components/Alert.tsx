import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'

import type { RecipeVariantProps } from '~css/css'
import { cva } from '~css/css'

const styles = cva({
  base: {
    marginBlock: '8',
    borderRadius: 'lg',
    borderInlineStartWidth: '8',
    padding: '6',
  },
  variants: {
    variation: {
      primary: {
        borderInlineStartColor: 'blue.9',
        backgroundColor: 'blue.3',
      },
      danger: {
        borderInlineStartColor: 'tomato.9',
        backgroundColor: 'tomato.3',
      },
    },
  },
})

type AlertVariants = RecipeVariantProps<typeof styles>

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AlertVariants
>(({ variation = 'primary', ...rest }, ref) => {
  return <div ref={ref} {...rest} className={styles({ variation })} />
})

export default Alert
