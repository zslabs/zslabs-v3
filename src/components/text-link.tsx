import type { HTMLAttributes, ReactNode } from 'react'

import {
  Link as TSLink,
  type LinkProps as TSLinkProps,
} from '@tanstack/react-router'

export interface TextLinkProps
  extends
    Omit<TSLinkProps, 'to'>,
    Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?:
    | TSLinkProps['to']
    | `http://${string}`
    | `https://${string}`
    | `mailto:${string}`
  children?: ReactNode
}

export default function TextLink({ to, children, ...rest }: TextLinkProps) {
  const isExternalUrl =
    typeof to === 'string' &&
    (to.startsWith('http://') ||
      to.startsWith('https://') ||
      to.startsWith('mailto:'))

  if (isExternalUrl) {
    return (
      <a href={to} {...rest} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <TSLink to={to as TSLinkProps['to']} {...rest}>
      {children}
    </TSLink>
  )
}
