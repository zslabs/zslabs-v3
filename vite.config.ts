import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import type { Element, Root, Text } from 'hast'
import { nitro } from 'nitro/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { visit } from 'unist-util-visit'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warning code
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        // For all other warnings, call the default handler
        warn(warning)
      },
    },
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: 'one-dark-pro',
            transformers: [
              {
                pre(node: Element) {
                  if (node.properties) {
                    delete node.properties.style
                  }
                },
                code(node: Element) {
                  if (node.properties) {
                    node.properties['data-snippet'] = true
                  }
                },
              },
            ],
          },
        ],
        () => (tree: Root) => {
          visit(tree, 'element', (node: Element) => {
            if (node.tagName === 'pre' && node.children.length > 0) {
              const codeNode = node.children.find(
                (child): child is Element =>
                  child.type === 'element' && child.tagName === 'code'
              )

              if (codeNode) {
                const extractText = (nodes: (Element | Text)[]): string => {
                  return nodes
                    .map((child) => {
                      if (child.type === 'text') {
                        return child.value
                      }
                      if ('children' in child) {
                        return extractText(child.children as (Element | Text)[])
                      }
                      return ''
                    })
                    .join('')
                }

                const rawCode = extractText(
                  codeNode.children as (Element | Text)[]
                ).trim()

                if (rawCode) {
                  node.properties = node.properties || {}
                  node.properties.rawCode = rawCode
                }
              }
            }
          })
        },
      ],
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    tanstackStart(),
    nitro({
      rollupConfig: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
          warn(warning)
        },
      },
    }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})
