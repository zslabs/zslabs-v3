'use client'

import * as React from 'react'

import { Button as ButtonPrimitive } from 'react-aria-components'

import Check from '@/icons/check.svg'
import Clipboard from '@/icons/clipboard.svg'
import { css } from '@css/css'

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
      className={`group ${css({
        display: 'block',
        cursor: 'pointer',

        _focus: {
          outline: 'none',
        },
      })}`}
    >
      <span
        className={css({
          _groupActive: {
            display: 'none',
          },
        })}
      >
        <Clipboard />
      </span>
      <span
        className={css({
          display: 'none',

          _groupActive: {
            display: 'block',
          },
        })}
      >
        <Check />
      </span>
    </ButtonPrimitive>
  )
}
