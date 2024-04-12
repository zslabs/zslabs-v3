import { css } from '~css/css'

interface ProseProps {
  children: React.ReactNode
}

const Prose = ({ children, ...rest }: ProseProps) => {
  return (
    <div
      {...rest}
      className={css({
        color: 'slate.11',
        textWrap: 'pretty',
      })}
    >
      {children}
    </div>
  )
}

export default Prose
