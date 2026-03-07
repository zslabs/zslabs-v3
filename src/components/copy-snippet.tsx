import { css } from '@css/css'

import { Button } from '@/components/button'
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
    <Button onPress={() => copy(codeString)} aria-label="Copy snippet" iconOnly>
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
    </Button>
  )
}
