'use client'

import Link from 'next/link'

import Icon from '~components/Icon'
import Tooltip from '~components/Tooltip'

export default function MoreArticlesLink() {
  return (
    <Tooltip content="More articles">
      <Link href="/articles">
        <Icon name="more" />
      </Link>
    </Tooltip>
  )
}
