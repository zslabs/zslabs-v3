import { css } from '~css/css'

export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        marginBlock: '6',
        borderWidth: '1',
        borderColor: 'slate.6',
        borderRadius: 'lg',
        padding: '4',
        width: 'fit',
        outlineWidth: '4',
        outlineStyle: 'solid',
        outlineColor: 'slate.3',
        backgroundColor: 'slate.2',
        boxShadow: 'sm',
        position: 'relative',
      })}
    >
      {children}
    </div>
  )
}
