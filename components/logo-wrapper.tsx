import { css } from '~css/css'

export default function LogoWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={css({
        width: 'fit',
        borderRadius: 'lg',
        backgroundColor: 'white.a.11',
        padding: '1',
        marginBlock: '6',
      })}
    >
      {children}
    </div>
  )
}
