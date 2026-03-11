import type { JSX } from 'react'

import { notFound } from '@tanstack/react-router'

interface ArticleFrontmatter {
  title: string
  date: string
  excerpt?: string
}

interface DataFrontmatter {
  title: string
}

interface TokenFrontmatter {
  title: string
  published: boolean
  poster: string
  order: number
}

interface ArticleRouteTarget {
  to: '/articles/$slug'
  params: {
    slug: string
  }
}

interface TokenRouteTarget {
  to: '/token/$slug'
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

const tokenFiles = import.meta.glob<MDXModule<TokenFrontmatter>>(
  '/src/content/token/*.mdx',
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
    throw notFound()
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

export function getToken(slug: string) {
  const filePath = `/src/content/token/${slug}.mdx`
  const token = tokenFiles[filePath]

  if (!token) {
    throw notFound()
  }

  if (!token.frontmatter.published && !import.meta.env.DEV) {
    throw notFound()
  }

  return {
    component: token.default,
    frontmatter: token.frontmatter,
  }
}

export function getTokens() {
  return Object.entries(tokenFiles)
    .map(([filePath, module]) => {
      const filename = filePath.split('/').pop()!
      const slug = filename.replace(/\.mdx?$/, '')
      const { frontmatter } = module

      return {
        to: '/token/$slug' as const,
        params: {
          slug,
        },
        frontmatter,
        title: frontmatter.title,
        poster: frontmatter.poster,
        order: frontmatter.order,
        published: frontmatter.published,
      } satisfies TokenRouteTarget & {
        frontmatter: TokenFrontmatter
        title: string
        poster: string
        order: number
        published: boolean
      }
    })
    .sort((a, b) => a.order - b.order)
}
