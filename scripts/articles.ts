import { promises as fs } from 'fs'
import path from 'path'

import matter from 'gray-matter'

async function main() {
  const directoryPath = path.join(process.cwd(), 'content', 'articles')
  const filenames = await fs.readdir(directoryPath)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(directoryPath, filename)
      const content = await fs.readFile(filePath, 'utf8')
      const { data: frontmatter } = matter(content)

      return {
        title: frontmatter.title,
        url: `/articles/${filename.replace(/\.mdx?$/, '')}`,
        date: new Date(frontmatter.date).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        excerpt: frontmatter.excerpt,
      }
    })
  )

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  await fs.writeFile('./articles.json', JSON.stringify(posts, null, 2))
}

main()
