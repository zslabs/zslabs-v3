import * as React from 'react'

import Link from 'next/link'

// Checks against absolute URLs that share 👇 so we can still pass it along to our internal link component
const domainRegex = /http[s]*:\/\/[www.]*zslabs\.com[/]?/

export interface TextLinkProps
  extends React.PropsWithoutRef<React.HTMLAttributes<HTMLAnchorElement>> {
  href?: string
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ href, children, ...rest }, forwardRef) => {
    if (!href) return null

    const sameDomain = domainRegex.test(href)

    // If our link matches the `domainRegex` above, update to become relative
    if (sameDomain) {
      href = href.replace(domainRegex, '/')
    }

    // If our link is relative, we can assume it's an internal link and use `next/link`
    if (href.startsWith('/')) {
      return (
        <Link href={href} ref={forwardRef} data-link-internal {...rest}>
          {children}
        </Link>
      )
    }

    // Treat urls that aren't http protocols as "normal" links
    if (!href.startsWith('http')) {
      return (
        <a href={href} ref={forwardRef} {...rest}>
          {children}
        </a>
      )
    }

    // Otherwise, this is an external link that we can add on good security defaults for
    return (
      <a
        ref={forwardRef}
        data-link-external
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }
)

export default TextLink
