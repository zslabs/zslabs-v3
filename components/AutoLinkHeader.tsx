import Hash from '@/icons/hash.svg'
import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'

interface AutoLinkHeaderProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

export default function AutoLinkHeader({
  as: Component = 'h1',
  children,
  ...rest
}: AutoLinkHeaderProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Component {...rest}>
      <a href={`#${rest.id}`} className="group">
        {children}{' '}
        <span
          className={css({
            opacity: '0',
            transitionProperty: 'opacity',
            transitionDuration: 'fast',
            transitionTimingFunction: 'default',
            color: 'slate.11',
            willChange: 'opacity',

            _groupHover: {
              opacity: '100',
            },
          })}
        >
          <Hash className={inlineIcon()} />
        </span>
      </a>
    </Component>
  )
}
