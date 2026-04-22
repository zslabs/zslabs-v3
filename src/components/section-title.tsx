import type { HTMLAttributes } from 'react'

import type { RecipeVariantProps } from '@css/css'
import { cva } from '@css/css'

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const styles = cva({
  base: {
    marginBlockEnd: '8',
    fontSize: '2xl',
    fontWeight: 'medium',
    color: 'slate.12',
  },
  variants: {
    variation: {
      mono: {
        textStyle: 'mono',
      },
    },
  },
  defaultVariants: {
    variation: undefined,
  },
})

type SectionTitleVariants = RecipeVariantProps<typeof styles>

function SectionTitle({
  children,
  variation,
  ...props
}: SectionTitleProps & SectionTitleVariants) {
  return (
    <h3 {...props} className={styles({ variation })}>
      {children}
    </h3>
  )
}

export default SectionTitle
