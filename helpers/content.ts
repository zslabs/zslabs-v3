import { promises as fs } from 'fs'
import path from 'path'

import bundle from '@/app/mdx-bundler'

export async function getAllPosts(limit?: number) {
  const directoryPath = path.join(process.cwd(), 'content', 'articles')

  try {
    const filenames = await fs.readdir(directoryPath)

    const fileContents = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(directoryPath, filename)
        const content = await fs.readFile(filePath, 'utf8')

        const { frontmatter, code } = await bundle(content)

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
          code,
        }
      })
    )

    // Sort files by date (assuming ISO 8601 format, e.g., "2024-01-01")
    fileContents.sort(
      (a, b) => new Date(b.dateRAW).getTime() - new Date(a.dateRAW).getTime()
    )

    return limit && limit > 0 ? fileContents.slice(0, limit) : fileContents
  } catch (err) {
    console.error('Error reading files:', err)

    throw err
  }
}

export async function getAllStatics(limit = null) {
  const directoryPath = path.join(process.cwd(), 'content', 'data')

  try {
    const filenames = await fs.readdir(directoryPath)

    const fileContents = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(directoryPath, filename)
        const content = await fs.readFile(filePath, 'utf8')

        const { frontmatter, code } = await bundle(content)

        return {
          url: filename.replace(/\.mdx?$/, ''),
          title: frontmatter.title,
          code,
        }
      })
    )

    return limit && limit > 0 ? fileContents.slice(0, limit) : fileContents
  } catch (err) {
    console.error('Error reading files:', err)

    throw err
  }
}
