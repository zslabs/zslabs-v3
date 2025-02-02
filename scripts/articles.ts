import { promises as fs } from 'fs'

import { getAllPosts } from '@/helpers/content'

async function main() {
  const posts = await getAllPosts()

  const postsResolved = posts.map((post) => {
    return {
      title: post.title,
      url: post.url,
      date: post.date,
      excerpt: post.excerpt,
    }
  })

  fs.writeFile('./app/articles.json', JSON.stringify(postsResolved, null, 2))
}

main()
