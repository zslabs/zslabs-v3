import * as React from 'react'

import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Icon from './Icon'

interface CodeProps {
  codeString: string
  language: Language
}

export default function Code({ codeString, language }: CodeProps) {
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
        <aside className="max-h-120 overflow-auto overscroll-contain rounded-lg p-4 font-mono tracking-normal">
          <pre className={className}>
            {isCopied ? (
              <Icon name="clipboard-check" />
            ) : (
              <CopyToClipboard text={codeString} onCopy={handleCopy}>
                <button
                  type="button"
                  className="block focus:outline-none"
                  title="Copy snippet"
                >
                  <Icon name="clipboard" />
                </button>
              </CopyToClipboard>
            )}
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
      )}
    </Highlight>
  )
}
