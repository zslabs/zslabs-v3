'use client'

import * as React from 'react'

import { Button as ButtonPrimitive } from 'react-aria-components'

import Icon from '~components/Icon'
import { css } from '~css/css'

export default function CopySnippet({ codeString }: { codeString: string }) {
  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeString)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [codeString])

  return (
    <ButtonPrimitive
      onPress={handleCopy}
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
        <Icon name="clipboard" />
      </span>
      <span
        className={css({
          display: 'none',

          _groupActive: {
            display: 'block',
          },
        })}
      >
        <Icon name="check" />
      </span>
    </ButtonPrimitive>
  )
}
