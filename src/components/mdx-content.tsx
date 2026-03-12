import type { JSX } from 'react'

import { css } from '@css/css'
import type { MDXComponents } from 'mdx/types'

import Alert from '@/components/alert'
import AutoLinkHeader from '@/components/auto-link-header'
import type { BlockquoteProps } from '@/components/blockquote'
import Blockquote from '@/components/blockquote'
import CodePen from '@/components/code-pen'
import CodeWrapper from '@/components/code-wrapper'
import { Columns, Column } from '@/components/columns'
import Prose from '@/components/prose'
import type { TextLinkProps } from '@/components/text-link'
import TextLink from '@/components/text-link'

interface ImageComponentProps {
  alt?: string
  caption?: string
  src: string
  height: number | string
  width: number | string
}

function Image({
  alt = '',
  src,
  height,
  width,
}: ImageComponentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <img
      alt={alt}
      src={src}
      height={height}
      width={width}
      loading="lazy"
      decoding="async"
      className={css({
        borderRadius: 'xl',
        marginBlock: '8',
        maxInlineSize: 'full',
        marginInline: 'auto',
        padding: '1',
        backgroundColor: 'slate.2',
        borderWidth: '1',
        borderColor: 'slate.5',
        borderStyle: 'solid',
      })}
    />
  )
}

const components: MDXComponents = {
  a: ({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <TextLink to={href as TextLinkProps['to']} {...rest} />
  ),
  blockquote: (props: BlockquoteProps) => <Blockquote {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <AutoLinkHeader as="h1" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <AutoLinkHeader as="h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <AutoLinkHeader as="h3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <AutoLinkHeader as="h4" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <AutoLinkHeader as="h5" {...props} />
  ),
  pre: ({
    rawCode,
    ...rest
  }: React.HTMLAttributes<HTMLPreElement> & {
    rawCode: string
  }) => {
    const codeTitle = (rest as Record<string, unknown>)['data-title']

    return (
      <CodeWrapper
        codeString={rawCode}
        title={typeof codeTitle === 'string' ? codeTitle : undefined}
      >
        <pre
          className={css({
            display: 'grid',
          })}
          {...rest}
        />
      </CodeWrapper>
    )
  },
  Alert,
  Image,
  CodePen,
  TextLink,
  Columns,
  Column,
}

export default function MDXContent({
  Component,
}: {
  Component: (props: Record<string, unknown>) => JSX.Element
}) {
  return (
    <Prose>
      <Component components={components} />
    </Prose>
  )
}
