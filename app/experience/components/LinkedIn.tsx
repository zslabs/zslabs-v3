'use client'

import TextLink from '@/components/TextLink'
import Tooltip from '@/components/Tooltip'
import More from '@/icons/more.svg'
import { css } from '@/styled-system/css'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <TextLink
        className={css({
          display: 'block',
          width: 'fit',
          borderRadius: 'full',
          backgroundColor: 'black.a.8',
          boxShadow: 'slate',
          padding: '2',
          borderWidth: '1',
          borderColor: 'slate.7',
          borderStyle: 'solid',
          fontSize: 'xl',
        })}
        href="https://www.linkedin.com/in/zachschnackel/"
      >
        <More />
      </TextLink>
    </Tooltip>
  )
}
