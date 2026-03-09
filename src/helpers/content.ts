import type { JSX } from 'react'

interface ArticleFrontmatter {
  title: string
  date: string
  excerpt?: string
}

interface DataFrontmatter {
  title: string
}

interface ArticleRouteTarget {
  to: '/articles/$slug'
  params: {
    slug: string
  }
}

type MDXModule<T> = {
  default: (props: Record<string, unknown>) => JSX.Element
  frontmatter: T
}

const articleFiles = import.meta.glob<MDXModule<ArticleFrontmatter>>(
  '/src/content/articles/*.mdx',
  {
    eager: true,
  }
)

const dataFiles = import.meta.glob<MDXModule<DataFrontmatter>>(
  '/src/content/data/*.mdx',
  {
    eager: true,
  }
)

export function getAllPosts(limit?: number) {
  const entries = Object.entries(articleFiles)

  const fileContents = entries.map(([filePath, module]) => {
    const filename = filePath.split('/').pop()!
    const { frontmatter } = module

    return {
      dateRAW: frontmatter.date,
      date: new Date(frontmatter.date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      to: '/articles/$slug' as const,
      params: {
        slug: filename.replace(/\.mdx?$/, ''),
      },
      excerpt: frontmatter.excerpt,
      title: frontmatter.title,
    } satisfies ArticleRouteTarget & {
      dateRAW: string
      date: string
      excerpt?: string
      title: string
    }
  })

  // Sort files by date (assuming ISO 8601 format, e.g., "2024-01-01")
  fileContents.sort(
    (a, b) => new Date(b.dateRAW).getTime() - new Date(a.dateRAW).getTime()
  )

  return limit && limit > 0 ? fileContents.slice(0, limit) : fileContents
}

export function getAllStatics(limit?: number) {
  const entries = Object.entries(dataFiles)

  const fileContents = entries.map(([filePath]) => {
    const filename = filePath.split('/').pop()!

    return {
      url: `/${filename.replace(/\.mdx?$/, '')}`,
    }
  })

  return limit && limit > 0 ? fileContents.slice(0, limit) : fileContents
}

export function getArticle(slug: string) {
  const filePath = `/src/content/articles/${slug}.mdx`
  const post = articleFiles[filePath]

  if (!post) {
    return null
  }

  return {
    component: post.default,
    frontmatter: post.frontmatter,
  }
}

export function getDataPage(relativePath: string) {
  const key = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  const page = dataFiles[key]

  if (!page) {
    return null
  }

  return {
    component: page.default,
    frontmatter: page.frontmatter,
  }
}
