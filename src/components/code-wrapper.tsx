import { css } from '@css/css'

import CopySnippet from '@/components/copy-snippet'

interface CodeProps {
  codeString: string
  children: React.ReactNode
}

export default function CodeWrapper({ codeString, children }: CodeProps) {
  return (
    <div
      className={css({
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
      data-code
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
  )
}
