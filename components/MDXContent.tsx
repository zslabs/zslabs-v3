import React from 'react'

import type { MDXComponents, MDXContent } from 'mdx/types'
import { getMDXComponent } from 'mdx-bundler/client'
import type { ImageProps } from 'next/image'
import NextImage from 'next/image'

import Alert from '@/components/Alert'
import AutoLinkHeader from '@/components/AutoLinkHeader'
import type { BlockquoteProps } from '@/components/Blockquote'
import Blockquote from '@/components/Blockquote'
import CodePen from '@/components/CodePen'
import CodeWrapper from '@/components/CodeWrapper'
import Prose from '@/components/Prose'
import type { TextLinkProps } from '@/components/TextLink'
import TextLink from '@/components/TextLink'
import { css } from '@css/css'

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
    <figure
      className={css({
        marginBlock: '8',
        textAlign: 'center',
      })}
    >
      <div
        className={css({
          position: 'relative',
          marginInline: 'auto',
          borderRadius: 'xl',
          width: 'fit',
          display: 'grid',
        })}
      >
        <div
          className={css({
            position: 'absolute',
            inset: '-2',
            zIndex: '-1',
            borderRadius: 'xl',
            backgroundColor: 'black.a.8',
          })}
        />
        <NextImage
          alt={alt}
          src={src}
          height={height}
          width={width}
          className={css({
            borderRadius: 'xl',
          })}
        />
      </div>
      {caption && (
        <figcaption
          className={css({
            marginBlockStart: '4',
            color: 'slate.11',
            fontSize: 'sm',
          })}
        >
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
  TextLink,
  pre: ({
    rawCode,
    ...rest
  }: React.HTMLAttributes<HTMLPreElement> & {
    rawCode: string
  }) => {
    return (
      <CodeWrapper codeString={rawCode}>
        <pre
          className={css({
            display: 'grid',
          })}
          {...rest}
        />
      </CodeWrapper>
    )
  },
}

export default function MDXContent({ code }: { code: string }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <Prose>
      <Component components={components} />
    </Prose>
  )
}
