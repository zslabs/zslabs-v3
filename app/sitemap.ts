import type { MetadataRoute } from 'next'

import { getAllPosts, getAllStatics } from '@/helpers/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const statics = await getAllStatics()

  const data = [
    ...posts.map((post) => post.url),
    ...statics.map((page) => page.url),
  ]

  return data.map((url) => ({
    url: `https://zslabs.com${url}`,
    lastModified: new Date(),
  }))
}
