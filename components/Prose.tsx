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

        '& > :first-child': {
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
          transitionTimingFunction: 'default',

          _hover: {
            textUnderlineOffset: '6',
          },
        },

        '& ol': {
          paddingInlineStart: '4',
          counterReset: 'list-counter',

          '& li': {
            position: 'relative',
            counterIncrement: 'list-counter',
            paddingInlineStart: '7',

            _before: {
              content: 'counter(list-counter) "."',
              position: 'absolute',
              insetInlineStart: '1',
              fontWeight: 'medium',
            },
          },
        },

        '& li': {
          marginBlock: '2',
        },

        '& ul': {
          paddingInlineStart: '4',

          '& > li': {
            position: 'relative',
            paddingInlineStart: '7',

            _before: {
              content: '""',
              position: 'absolute',
              insetInlineStart: '1',
              insetBlockStart: '2',
              width: '2',
              height: '2',
              borderRadius: 'full',
              backgroundColor: 'slate.9',
              boxShadow: 'slate',
            },
          },
        },
      })}
    >
      {children}
    </div>
  )
}

export default Prose
