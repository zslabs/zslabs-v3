import { css } from '@css/css'

import TextLink from '@/components/text-link'
import Tooltip from '@/components/tooltip'
import More from '@/icons/more.svg?react'

export default function LinkedIn() {
  return (
    <Tooltip content="LinkedIn">
      <TextLink
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
        href="https://www.linkedin.com/in/zachschnackel/"
      >
        <More />
      </TextLink>
    </Tooltip>
  )
}
