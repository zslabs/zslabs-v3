'use client'

import Icon from '~components/Icon'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <TextLink href="https://www.linkedin.com/in/zachschnackel/">
        <Icon name="more" />
      </TextLink>
    </Tooltip>
  )
}
