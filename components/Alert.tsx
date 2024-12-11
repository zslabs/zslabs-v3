import * as React from 'react'

import type { RecipeVariantProps } from '~css/css'
import { cva } from '~css/css'

const styles = cva({
  base: {
    marginBlock: '8',
    borderRadius: 'xl',
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

export default function Alert({
  ref,
  variation = 'primary',
  ...rest
}: AlertVariants & {
  ref?: React.Ref<HTMLDivElement>
}) {
  return <div ref={ref} {...rest} className={styles({ variation })} />
}
