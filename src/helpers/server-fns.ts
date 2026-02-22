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
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const { default: bundle } = await import('@/lib/mdx-bundler')

    const filePath = path.resolve(
      process.cwd(),
      'content',
      'articles',
      `${slug}.mdx`
    )

    let currentPost: string
    try {
      currentPost = await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }

    if (!currentPost) {
      return null
    }

    const { frontmatter, code } = await bundle(currentPost)

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
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const { default: bundle } = await import('@/lib/mdx-bundler')

    const filePath = path.resolve(process.cwd(), relativePath)

    let page: string
    try {
      page = await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }

    if (!page) {
      return null
    }

    const { frontmatter, code } = await bundle(page)

    return { title: frontmatter.title as string, code }
  })
