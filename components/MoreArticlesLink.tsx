'use client'

import Icon from '~components/Icon'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'
import { css } from '~css/css'

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
        <Icon name="more" />
      </TextLink>
    </Tooltip>
  )
}
