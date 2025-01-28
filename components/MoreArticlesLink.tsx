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
          borderRadius: 'full',
          backgroundColor: 'black.a.8',
          padding: '1',
          fontSize: 'xl',
          display: 'block',
          width: 'fit',
        })}
      >
        <More />
      </TextLink>
    </Tooltip>
  )
}
