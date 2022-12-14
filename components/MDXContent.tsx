import React from 'react'

import type { MDX } from 'contentlayer/core'
import { getMDXComponent } from 'mdx-bundler/client'
import type { ImageProps } from 'next/image'
import NextImage from 'next/image'

import Alert from '~components/Alert'
import AutoLinkHeader from '~components/AutoLinkHeader'
import type { BlockquoteProps } from '~components/Blockquote'
import Blockquote from '~components/Blockquote'
import Code from '~components/Code'
import CodePen from '~components/CodePen'
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
      <div className="relative mx-auto grid w-fit rounded-xl shadow">
        <div className="-z-1 absolute -inset-2 rounded-xl bg-overlay-8 shadow-inner" />
        <NextImage
          alt={alt}
          src={src}
          height={height}
          width={width}
          className="rounded-xl"
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

const components = {
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
  pre: (preProps: React.HTMLAttributes<HTMLPreElement>) => {
    const {
      children: {
        // @ts-expect-error MDX generated
        props: { children, className, meta },
      },
    } = preProps

    let metaProps: Record<string, string | number | boolean> = {}

    if (meta) {
      metaProps = meta
        .split(' ')
        .reduce(
          (acc: Record<string, string | number | boolean>, curr: string) => {
            const [key, value] = curr.split('=')

            return { ...acc, [key]: value }
          },
          {}
        )
    }

    const props = {
      codeString: children.trim(),
      language: className && className.split('-')[1],
      meta: metaProps,
    }

    return (
      <div className="my-8">
        <Code {...props} />
      </div>
    )
  },
  Alert,
  Image,
  CodePen,
  Tweet,
  TextLink,
}

const MDXContent: React.FC<{
  content: MDX
}> = ({ content }) => {
  const Component = React.useMemo(
    () => getMDXComponent(content.code),
    [content]
  )

  return (
    <Prose>
      {/* @ts-expect-error TODO Component mismatch */}
      <Component components={components} />
    </Prose>
  )
}

export default MDXContent
