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

        '& :is(h2, h3, h4, h5, h6)': {
          fontWeight: 'medium',
          fontSize: 'lg',
          color: 'slate.12',
          marginBlockStart: '10',
        },

        '& * + :is(p, ul, ol, dl, blockquote:not([class]), address, fieldset, [data-rehype-pretty-code-figure])':
          {
            marginBlockStart: '6',
          },

        '& > :first_child': {
          marginBlockStart: '0',
        },

        '& > :last-child': {
          marginBlockEnd: '0',
        },

        '& a:not([class])': {
          color: 'slate.12',
          textDecorationLine: 'underline',
          textUnderlineOffset: '4',
          textDecorationStyle: 'dotted',
          transitionProperty: 'all',
          transitionDuration: 'fast',
          transitionTimingFunction: 'in-out',

          _hover: {
            textUnderlineOffset: '6',
          },
        },
      })}
    >
      {children}
    </div>
  )
}

export default Prose
