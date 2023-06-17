import Icon from '~components/Icon'

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
        <span className="opacity-0 transition-opacity duration-150 group-hocus:opacity-100">
          <Icon name="hash" inline />
        </span>
      </a>
    </Component>
  )
}
