import type { RecipeVariantProps } from '@css/css'
import { cva } from '@css/css'

const styles = cva({
  base: {
    fontSize: 'sm',
    borderRadius: 'full',
    textStyle: 'mono',
    textTransform: 'uppercase',
    letterSpacing: 'normal',
    width: 'fit',
    paddingInline: '3',
    paddingBlock: '0.5',
    display: 'flex',
    gap: '2',
    cursor: 'default',
    color: 'slate.11',
  },
  variants: {
    variation: {
      default: {
        borderWidth: '1',
        borderColor: 'slate.3',
        backgroundColor: 'black.a.6',
      },
      contrast: {
        backgroundColor: 'slate.1',
      },
    },
  },
  defaultVariants: {
    variation: 'default',
  },
})

type BadgeVariants = RecipeVariantProps<typeof styles>

export function Badge({
  children,
  variation,
}: {
  children: React.ReactNode
} & BadgeVariants) {
  return (
    <span className={styles({ variation })} data-code>
      {children}
    </span>
  )
}
