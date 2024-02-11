/* eslint-disable no-param-reassign */

import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import type { Options, LineElement, CharsElement } from 'rehype-pretty-code'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import { visit } from 'unist-util-visit'

/* @SOURCE for rehype content blocks; https://github.com/shadcn/ui/blob/main/apps/www/contentlayer.config.js */

const rehypePrettyCodeOptions: Options = {
  // Use one of Shiki's packaged themes
  theme: 'one-dark-pro',

  // Keep the background or use a custom background color
  keepBackground: false,

  // Prevent collapsing of single-line blocks
  grid: true,

  onVisitHighlightedLine(element: LineElement) {
    // Each line element by default has `[data-line]`
    element.properties.className?.push('highlighted')
  },

  onVisitHighlightedChars(element: CharsElement) {
    // Each word element has no className by default
    element.properties.className = ['word']
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: './articles/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('articles/', ''),
    },
  },
}))

export const Static = defineDocumentType(() => ({
  name: 'Static',
  filePathPattern: './data/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('data/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Static],
  mdx: {
    remarkPlugins: [codeImport],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') {
              return
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
          }
        })
      },
      // @ts-expect-error https://github.com/atomiks/rehype-pretty-code/issues/127
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'figure') {
            if (!('data-rehype-pretty-code-figure' in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') {
              return
            }

            preElement.properties.__rawString__ = node.__rawString__

            if (node.__src__) {
              preElement.properties.__src__ = node.__src__
            }
          }
        })
      },
      rehypeSlug,
    ],
  },
})
