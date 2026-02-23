import matter from 'gray-matter'

const articleFiles = import.meta.glob<string>('/content/articles/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const dataFiles = import.meta.glob<string>('/content/data/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export async function getAllPosts(limit?: number) {
  const entries = Object.entries(articleFiles)

  const fileContents = entries.map(([filePath, content]) => {
    const filename = filePath.split('/').pop()!
    const { data: frontmatter } = matter(content)

    return {
      dateRAW: frontmatter.date,
      date: new Date(frontmatter.date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      url: `/articles/${filename.replace(/\.mdx?$/, '')}`,
      excerpt: frontmatter.excerpt,
      title: frontmatter.title,
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

export function getArticleSource(slug: string): string | null {
  const filePath = `/content/articles/${slug}.mdx`
  return articleFiles[filePath] ?? null
}

export function getDataSource(relativePath: string): string | null {
  // Normalize: accept both "content/data/foo.mdx" and "/content/data/foo.mdx"
  const key = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return dataFiles[key] ?? null
}
