import { css } from '@css/css'

import { Badge } from '@/components/badge'
import CopySnippet from '@/components/copy-snippet'

interface CodeProps {
  codeString: string
  title?: string
  children: React.ReactNode
}

export default function CodeWrapper({
  codeString,
  title,
  children,
}: CodeProps) {
  return (
    <div data-code>
      {title && <Badge>{title}</Badge>}
      <div
        className={css({
          marginBlockStart: '2',
          borderRadius: 'xl',
          textStyle: 'mono',
          backgroundColor: 'slate.2',
          fontWeight: 'normal',
          letterSpacing: 'normal',
          borderWidth: '1',
          padding: '1',
          borderStyle: 'solid',
          borderColor: 'slate.5',
          position: 'relative',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            insetBlockEnd: '0',
            insetInlineEnd: '0',
            translate: 'auto',
            translateX: '1/4',
            translateY: '1/4',
            borderRadius: 'full',
            padding: '1',
          })}
        >
          <CopySnippet codeString={codeString} />
        </div>
        <aside
          className={css({
            maxHeight: '120',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            borderRadius: 'lg',
            padding: '2',
            backgroundColor: 'slate.3',
          })}
        >
          {children}
        </aside>
      </div>
    </div>
  )
}
