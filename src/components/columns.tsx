import type { RecipeVariantProps } from '@css/css'
import { cva } from '@css/css'

const styles = cva({
  base: {
    display: 'grid',
    gap: '6',
    gridTemplateColumns: '1',
  },
  variants: {
    columns: {
      1: {
        gridTemplateColumns: '1',
      },
      2: {
        md: { gridTemplateColumns: '2' },
      },
      3: {
        md: { gridTemplateColumns: '3' },
      },
    },
  },
  defaultVariants: {
    columns: 1,
  },
})

type ColumnsVariants = RecipeVariantProps<typeof styles>

export function Columns({
  children,
  columns,
}: {
  children: React.ReactNode
} & ColumnsVariants) {
  return (
    <div className={styles({ columns })} data-columns>
      {children}
    </div>
  )
}

export function Column({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
