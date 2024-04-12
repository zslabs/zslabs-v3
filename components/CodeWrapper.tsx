import CopySnippet from '~components/CopySnippet'
import { css } from '~css/css'

interface CodeProps {
  codeString: string
  children: React.ReactNode
}

export default function CodeWrapper({ codeString, children }: CodeProps) {
  return (
    <div
      className={css({
        borderRadius: 'lg',
        fontFamily: 'code',
        fontWeight: 'normal',
        letterSpacing: 'normal',
      })}
    >
      <header
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4',
          borderTopLeftRadius: 'xl',
          borderTopRightRadius: 'xl',
          paddingBlock: '2',
          paddingInline: '4',
          backgroundColor: 'black.a.11',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '4',
          })}
        >
          <div
            className={css({
              display: 'flex',
              gap: '2',
            })}
          >
            <span
              className={css({
                width: '3',
                height: '3',
                borderRadius: 'full',
                backgroundColor: 'tomato.9',
              })}
            />
            <span
              className={css({
                width: '3',
                height: '3',
                borderRadius: 'full',
                backgroundColor: 'yellow.9',
              })}
            />
            <span
              className={css({
                width: '3',
                height: '3',
                borderRadius: 'full',
                backgroundColor: 'green.9',
              })}
            />
          </div>
        </div>
        <div>
          <CopySnippet codeString={codeString} />
        </div>
      </header>
      <aside className="max-h-120 overflow-auto overscroll-contain rounded-b-xl bg-overlay-8 p-4">
        {children}
      </aside>
    </div>
  )
}
