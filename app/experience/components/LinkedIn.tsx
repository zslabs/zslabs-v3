'use client'

import Link from 'next/link'

import Icon from '~components/Icon'
import Tooltip from '~components/Tooltip'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <Link href="https://www.linkedin.com/in/zachschnackel/">
        <Icon name="more" />
      </Link>
    </Tooltip>
  )
}
