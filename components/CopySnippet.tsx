'use client'

import * as React from 'react'

import Icon from '~components/Icon'

export default function CopySnippet({ codeString }: { codeString: string }) {
  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeString)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [codeString])

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy snippet"
      className="group block focus:outline-none"
    >
      <span className="group-active:hidden">
        <Icon name="clipboard" />
      </span>
      <span className="hidden group-active:block">
        <Icon name="check" />
      </span>
    </button>
  )
}
