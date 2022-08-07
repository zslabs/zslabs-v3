import slugify from 'slugify'

interface AutoLinkHeaderProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

const AutoLinkHeader: React.FC<
  AutoLinkHeaderProps & React.HTMLAttributes<HTMLHeadingElement>
> = ({ as: Component = 'h1', children, ...rest }) => {
  return (
    <Component
      {...rest}
      id={slugify((children as string).toString(), {
        lower: true,
        locale: 'en',
      })}
    >
      {children}
    </Component>
  )
}

export default AutoLinkHeader
