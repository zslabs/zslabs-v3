'use client'

import * as React from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Icon from '~components/Icon'
import Tooltip from '~components/Tooltip'

export default function CopySnippet({ codeString }: { codeString: string }) {
  const [isCopied, setCopied] = React.useState(false)

  // Reset icon after 3 seconds
  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => setCopied(false), 3000)
    }
  }, [isCopied])

  const handleCopy = React.useCallback(() => setCopied(true), [])

  return (
    <CopyToClipboard text={codeString} onCopy={handleCopy}>
      {isCopied ? (
        <Tooltip content="Copied!">
          <Icon name="check" />
        </Tooltip>
      ) : (
        <button type="button" className="block focus:outline-none">
          <Tooltip content="Copy snippet">
            <Icon name="clipboard" />
          </Tooltip>
        </button>
      )}
    </CopyToClipboard>
  )
}
