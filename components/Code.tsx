import * as React from 'react'

import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Icon from './Icon'
import Tooltip from './Tooltip'

interface CodeProps {
  codeString: string
  language: Language
  meta?: Record<string, string | number | boolean>
}

export default function Code({ codeString, language, meta }: CodeProps) {
  const [isCopied, setCopied] = React.useState(false)

  // Reset icon after 3 seconds
  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => setCopied(false), 3000)
    }
  }, [isCopied])

  const handleCopy = React.useCallback(() => setCopied(true), [])

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={codeString}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <div className="rounded-xl font-mono font-normal tracking-normal">
          <header className="flex items-center justify-between gap-4 rounded-t-xl bg-overlay-11 px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-danger-9" />
                <span className="h-3 w-3 rounded-full bg-warning-9" />
                <span className="h-3 w-3 rounded-full bg-success-9" />
              </div>
              {meta?.filename && (
                <div className="font-sans text-sm leading-none tracking-normal">
                  {meta.filename}
                </div>
              )}
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
            <pre className={className}>
              {tokens.map((line, i) => {
                const lineKey = `line-${i}`

                return (
                  <div key={lineKey} {...getLineProps({ line, key: i })}>
                    {line.length === 1 && line[0].empty === true && (
                      <span>&#8203;</span>
                    )}
                    {line.map((token, index) => {
                      const key = `line-${index}`

                      return (
                        <span key={key} {...getTokenProps({ token, index })} />
                      )
                    })}
                  </div>
                )
              })}
            </pre>
          </aside>
        </div>
      )}
    </Highlight>
  )
}
