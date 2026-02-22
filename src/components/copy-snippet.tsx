import { css } from '@css/css'
import { Button as ButtonPrimitive } from 'react-aria-components'

import Check from '@/icons/check.svg?react'
import Clipboard from '@/icons/clipboard.svg?react'

async function copy(codeString: string) {
  try {
    await navigator.clipboard.writeText(codeString)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export default function CopySnippet({ codeString }: { codeString: string }) {
  return (
    <ButtonPrimitive
      onPress={() => copy(codeString)}
      aria-label="Copy snippet"
      className={css({
        display: 'block',
        cursor: 'pointer',

        _focus: {
          outline: 'none',
        },
      })}
    >
      {({ isPressed }) =>
        isPressed ? (
          <span
            className={css({
              color: 'jade.9',
            })}
          >
            <Check />
          </span>
        ) : (
          <span>
            <Clipboard />
          </span>
        )
      }
    </ButtonPrimitive>
  )
}
