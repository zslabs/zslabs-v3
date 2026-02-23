import { createServerFn } from '@tanstack/react-start'

export const fetchAllPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAllPosts } = await import('./content')
    return getAllPosts()
  }
)

export const fetchAllStatics = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAllStatics } = await import('./content')
    return getAllStatics()
  }
)

export const fetchArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { getArticleSource } = await import('./content')
    const { default: bundle } = await import('@/lib/mdx-bundler')

    const source = getArticleSource(slug)

    if (!source) {
      return null
    }

    const { frontmatter, code } = await bundle(source)

    return {
      title: frontmatter.title as string,
      date: new Date(frontmatter.date as string).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      excerpt: frontmatter.excerpt as string,
      code,
    }
  })

export const fetchMDXPage = createServerFn({ method: 'GET' })
  .inputValidator((relativePath: string) => relativePath)
  .handler(async ({ data: relativePath }) => {
    const { getDataSource } = await import('./content')
    const { default: bundle } = await import('@/lib/mdx-bundler')

    const source = getDataSource(relativePath)

    if (!source) {
      return null
    }

    const { frontmatter, code } = await bundle(source)

    return { title: frontmatter.title as string, code }
  })
