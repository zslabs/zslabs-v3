'use client'

import More from '@/icons/more.svg'
import TextLink from '@/components/TextLink'
import Tooltip from '@/components/Tooltip'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <TextLink href="https://www.linkedin.com/in/zachschnackel/">
        <More />
      </TextLink>
    </Tooltip>
  )
}
