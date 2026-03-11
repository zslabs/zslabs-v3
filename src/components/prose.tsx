import { css } from '@css/css'

interface ProseProps {
  children: React.ReactNode
}

const Prose = ({ children, ...rest }: ProseProps) => {
  return (
    <div
      {...rest}
      className={css({
        '& :is(h2, h3, h4, h5, h6)': {
          fontWeight: 'medium',
          fontSize: 'lg',
          color: 'slate.12',
          marginBlockStart: '10',
        },

        '& * + :is(p, ul, ol, dl, blockquote:not([class]), address, fieldset, [data-code], [data-columns])':
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
          transitionProperty: 'textUnderlineOffset',
          transitionDuration: 'fast',
          transitionTimingFunction: 'default',

          _hover: {
            textUnderlineOffset: '6',
          },
        },

        '& ol': {
          paddingInlineStart: '8',
          listStyle: 'outside',
          listStyleType: 'decimal',
        },

        '& ul': {
          paddingInlineStart: '8',
          listStyle: 'outside',
          listStyleType: 'disc',
        },

        '& li': {
          marginBlock: '2',

          _marker: {
            color: 'slate.11',
            fontWeight: 'medium',
          },
        },
      })}
    >
      {children}
    </div>
  )
}

export default Prose
