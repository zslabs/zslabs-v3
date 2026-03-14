import mdx from '@mdx-js/rollup'
import babel from '@rolldown/plugin-babel'
import rehypeShiki from '@shikijs/rehype'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import type { Element } from 'hast'
import { nitro } from 'nitro/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

function getCodeBlockTitle(metaRaw?: string) {
  if (!metaRaw) {
    return null
  }

  const match = metaRaw.match(/\btitle\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s]+))/)
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null
}

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
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
                pre(
                  this: {
                    source?: string
                    options?: {
                      meta?: {
                        __raw?: string
                      }
                    }
                  },
                  node: Element
                ) {
                  if (node.properties) {
                    delete node.properties.style
                    node.properties.rawCode = this.source ?? ''

                    const title = getCodeBlockTitle(this.options?.meta?.__raw)
                    if (title) {
                      node.properties['data-title'] = title
                    }
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
      ],
    }),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    tanstackStart(),
    nitro(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
})
