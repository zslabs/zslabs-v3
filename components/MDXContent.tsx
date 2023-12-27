import React from 'react'

import type { MDX } from 'contentlayer/core'
import type { MDXComponents } from 'mdx/types'
import type { ImageProps } from 'next/image'
import NextImage from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Alert from '~components/Alert'
import AutoLinkHeader from '~components/AutoLinkHeader'
import type { BlockquoteProps } from '~components/Blockquote'
import Blockquote from '~components/Blockquote'
import CodePen from '~components/CodePen'
import CodeWrapper from '~components/CodeWrapper'
import Prose from '~components/Prose'
import type { TextLinkProps } from '~components/TextLink'
import TextLink from '~components/TextLink'
import Tweet from '~components/Tweet'

interface NextImageProps {
  alt?: ImageProps['alt']
  caption?: string
  src: ImageProps['src']
  height: ImageProps['height']
  width: ImageProps['width']
}

function Image({
  alt = '',
  caption,
  src,
  height,
  width,
}: NextImageProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <figure className="my-8 text-center">
      <div className="relative mx-auto grid w-fit rounded-lg shadow">
        <div className="absolute -inset-2 -z-1 rounded-lg bg-overlay-8 shadow-inner" />
        <NextImage
          alt={alt}
          src={src}
          height={height}
          width={width}
          className="rounded-lg"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-slate-11">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const components: MDXComponents = {
  a: (props: TextLinkProps) => <TextLink {...props} />,
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
  Alert,
  Image,
  CodePen,
  Tweet,
  TextLink,
  // @ts-expect-error Stingy types
  pre: ({
    __rawString__,
    ...rest
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__: string
  }) => {
    return (
      <CodeWrapper codeString={__rawString__}>
        <pre className="grid" {...rest} />
      </CodeWrapper>
    )
  },
}

export default function MDXContent({ content }: { content: MDX }) {
  const Component = useMDXComponent(content.code)

  return (
    <Prose>
      <Component components={components} />
    </Prose>
  )
}
