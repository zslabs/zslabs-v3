/* eslint-disable no-param-reassign */

import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import { visit } from 'unist-util-visit'

/* @SOURCE for rehype content blocks; https://github.com/shadcn/ui/blob/main/apps/www/contentlayer.config.js */

const rehypePrettyCodeOptions = {
  // Use one of Shiki's packaged themes
  theme: 'one-dark-pro',

  // Keep the background or use a custom background color?
  keepBackground: false,

  // Callback hooks to add custom logic to nodes when visiting
  // them.
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    // Each line node by default has `class="line"`.
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node: any) {
    // Each word node has no className by default.
    node.properties.className = ['word']
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
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
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