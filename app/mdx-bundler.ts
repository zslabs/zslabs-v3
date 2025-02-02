import rehypeShiki from '@shikijs/rehype'
import { bundleMDX } from 'mdx-bundler'

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
      ]

      return options
    },
  })
}
