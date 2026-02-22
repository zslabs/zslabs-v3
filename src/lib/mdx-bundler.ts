import { compile } from '@mdx-js/mdx'
import rehypeShiki from '@shikijs/rehype'
import matter from 'gray-matter'
import type { Root, Element, Text } from 'hast'
import { visit } from 'unist-util-visit'

export default async function bundle(source: string) {
  const { data: frontmatter, content } = matter(source)

  const compiled = await compile(content, {
    outputFormat: 'function-body',
    rehypePlugins: [
      [rehypeShiki, { theme: 'one-dark-pro' }],
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
  })

  return { frontmatter, code: String(compiled) }
}
