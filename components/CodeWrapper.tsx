'use client'

import * as React from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Icon from './Icon'
import Tooltip from './Tooltip'

interface CodeProps {
  codeString: string
  children: React.ReactNode
}

export default function CodeWrapper({ codeString, children }: CodeProps) {
  const [isCopied, setCopied] = React.useState(false)

  // Reset icon after 3 seconds
  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => setCopied(false), 3000)
    }
  }, [isCopied])

  const handleCopy = React.useCallback(() => setCopied(true), [])

  return (
    <div className="rounded-xl font-mono font-normal tracking-normal">
      <header className="flex items-center justify-between gap-4 rounded-t-xl bg-overlay-11 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-danger-9" />
            <span className="h-3 w-3 rounded-full bg-warning-9" />
            <span className="h-3 w-3 rounded-full bg-success-9" />
          </div>
        </div>
        <div>
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
        </div>
      </header>
      <aside className="max-h-120 overflow-auto overscroll-contain rounded-b-xl bg-overlay-8 p-4">
        {children}
      </aside>
    </div>
  )
}
