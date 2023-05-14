import type { MetadataRoute } from 'next'

import { allPosts, allStatics } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => post.url)

  const statics = allStatics.map((staticPage) => `/${staticPage.slug}`)

  const data = [...posts, ...statics]

  return data.map((url) => ({
    url: `https://zslabs.com${url}`,
    lastModified: new Date(),
  }))
}
