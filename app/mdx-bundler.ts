import rehypeShiki from '@shikijs/rehype'
import type { Root, Element, Text } from 'hast'
import { bundleMDX } from 'mdx-bundler'
import { visit } from 'unist-util-visit'

export default function bundle(source: string) {
  return bundleMDX({
    source,
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeShiki, { theme: 'one-dark-pro' }],
        () => (tree: Root) => {
          visit(tree, 'element', (node: Element) => {
            if (node.tagName === 'pre' && node.children.length > 0) {
              const codeNode = node.children.find(
                (child): child is Element =>
                  child.type === 'element' && child.tagName === 'code'
              )

              if (codeNode) {
                // Function to recursively extract text from nested elements
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

                // Extract raw code
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
      ]

      return options
    },
  })
}
