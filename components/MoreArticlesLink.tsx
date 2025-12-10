'use client'

import TextLink from '@/components/TextLink'
import Tooltip from '@/components/Tooltip'
import More from '@/icons/more.svg'
import { css } from '@css/css'

export default function MoreArticlesLink() {
  return (
    <Tooltip content="More articles">
      <TextLink
        href="/articles"
        className={css({
          display: 'block',
          width: 'fit',
          borderRadius: 'full',
          backgroundLinear: 'to-b',
          gradientFrom: 'slate.2',
          gradientTo: 'slate.1',
          boxShadow: 'slate',
          padding: '2',
          borderWidth: '1',
          borderColor: 'slate.7',
          borderStyle: 'solid',
          fontSize: 'xl',
        })}
      >
        <More />
      </TextLink>
    </Tooltip>
  )
}
