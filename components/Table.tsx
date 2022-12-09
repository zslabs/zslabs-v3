import ctl from '@netlify/classnames-template-literals'

import type { ChildrenOnlyProps } from '~types/custom'

export function Table({ children }: ChildrenOnlyProps) {
  return (
    <div className="inline-block min-w-full align-middle">
      <div className="shadow ring-1 ring-slate-7 ring-opacity-100">
        <table className="min-w-full border-separate border-spacing-0">
          {children}
        </table>
      </div>
    </div>
  )
}

export function TableHeader({ children }: ChildrenOnlyProps) {
  return (
    <th
      className={ctl(`
        sticky top-0 z-10 border-b border-b-slate-7 bg-slate-2 p-4 text-left text-sm font-bold uppercase tracking-wide
      `)}
    >
      {children}
    </th>
  )
}

export function TableRow({ children }: ChildrenOnlyProps) {
  return <tr className="odd:bg-overlay-6">{children}</tr>
}

export function TableCell({
  children,
  isLast,
}: ChildrenOnlyProps & { isLast?: boolean }) {
  return (
    <td className={ctl(`p-4 ${!isLast && 'border-b border-b-slate-7'}`)}>
      {children}
    </td>
  )
}
