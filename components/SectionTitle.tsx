import type { HTMLAttributes } from 'react'

import { css } from '@css/css'

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3
      className={css({
        marginBlockEnd: '8',
        fontSize: '2xl',
        fontWeight: 'normal',
        fontVariationSettings: 'wide',
      })}
    >
      {children}
    </h3>
  )
}

export default SectionTitle
