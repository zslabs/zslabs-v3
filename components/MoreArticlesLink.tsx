'use client'

import Icon from '~components/Icon'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'

export default function MoreArticlesLink() {
  return (
    <Tooltip content="More articles">
      <TextLink href="/articles">
        <Icon name="more" />
      </TextLink>
    </Tooltip>
  )
}
