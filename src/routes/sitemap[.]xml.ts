import { createFileRoute } from '@tanstack/react-router'

import { fetchAllPosts, fetchAllStatics } from '@/helpers/server-fns'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await fetchAllPosts()
        const statics = await fetchAllStatics()

        const urls = [
          { url: 'https://zslabs.com/', lastmod: new Date().toISOString() },
          {
            url: 'https://zslabs.com/articles',
            lastmod: new Date().toISOString(),
          },
          {
            url: 'https://zslabs.com/experience',
            lastmod: new Date().toISOString(),
          },
          {
            url: 'https://zslabs.com/uses',
            lastmod: new Date().toISOString(),
          },
          ...posts.map((post) => ({
            url: `https://zslabs.com/articles/${post.params.slug}`,
            lastmod: new Date().toISOString(),
          })),
          ...statics.map((page) => ({
            url: `https://zslabs.com${page.url}`,
            lastmod: new Date().toISOString(),
          })),
        ]

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (entry) => `<url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`
    )
    .join('\n  ')}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
