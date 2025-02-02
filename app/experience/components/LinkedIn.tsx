'use client'

import TextLink from '@/components/TextLink'
import Tooltip from '@/components/Tooltip'
import More from '@/icons/more.svg'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <TextLink href="https://www.linkedin.com/in/zachschnackel/">
        <More />
      </TextLink>
    </Tooltip>
  )
}
