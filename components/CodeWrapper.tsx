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
        borderRadius: 'xl',
        fontFamily: 'code',
        fontWeight: 'normal',
        letterSpacing: 'normal',
      })}
      data-code
    >
      <header
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4',
          borderStartStartRadius: 'xl',
          borderStartEndRadius: 'xl',
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
      <aside
        className={css({
          maxHeight: '120',
          overflow: 'auto',
          overscrollBehavior: 'contain',
          borderEndStartRadius: 'xl',
          borderEndEndRadius: 'xl',
          padding: '4',
          backgroundColor: 'black.a.8',
        })}
      >
        {children}
      </aside>
    </div>
  )
}
