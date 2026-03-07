import { css } from '@css/css'
import { Button as ButtonPrimitive } from 'react-aria-components'

import Check from '@/icons/check.svg?react'
import Copy from '@/icons/copy.svg?react'

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
        color: 'slate.11',
        transitionProperty: 'color',
        transitionDuration: 'fast',
        transitionTimingFunction: 'default',

        _hover: {
          color: 'slate.12',
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
          <Copy />
        )
      }
    </ButtonPrimitive>
  )
}
