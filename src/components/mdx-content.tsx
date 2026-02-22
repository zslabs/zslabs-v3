import { css } from '@css/css'
import { runSync } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import * as jsxRuntime from 'react/jsx-runtime'

import Alert from '@/components/alert'
import AutoLinkHeader from '@/components/auto-link-header'
import type { BlockquoteProps } from '@/components/blockquote'
import Blockquote from '@/components/blockquote'
import CodePen from '@/components/code-pen'
import CodeWrapper from '@/components/code-wrapper'
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
  caption,
  src,
  height,
  width,
}: ImageComponentProps & React.HTMLAttributes<HTMLDivElement>) {
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
            borderWidth: '1',
            borderStyle: 'solid',
            borderColor: 'slate.a.3',
            backgroundColor: 'black.a.8',
          })}
        />
        <img
          alt={alt}
          src={typeof src === 'string' ? src : ''}
          height={typeof height === 'number' ? height : undefined}
          width={typeof width === 'number' ? width : undefined}
          className={css({
            borderRadius: 'lg',
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
  const { default: Content } = runSync(code, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
  })

  return (
    <Prose>
      <Content components={components} />
    </Prose>
  )
}
