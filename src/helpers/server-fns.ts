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
    const { getArticle } = await import('./content')

    const article = getArticle(slug)

    if (!article) {
      return null
    }

    const { frontmatter } = article

    return {
      title: frontmatter.title,
      date: new Date(frontmatter.date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      excerpt: frontmatter.excerpt,
    }
  })

export const fetchMDXPage = createServerFn({ method: 'GET' })
  .inputValidator((relativePath: string) => relativePath)
  .handler(async ({ data: relativePath }) => {
    const { getDataPage } = await import('./content')

    const page = getDataPage(relativePath)

    if (!page) {
      return null
    }

    return { title: page.frontmatter.title }
  })
