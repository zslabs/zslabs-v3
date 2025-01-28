import Rss from 'rss'

import { allPosts } from '@contentlayer/generated'

const SITE_URL = 'https://zslabs.com'

export async function GET() {
  const feed = new Rss({
    title: 'Zach Schnackel',
    description: 'Full-stack/motion developer',
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'en',
  })

  const allPostsSorted = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  allPostsSorted.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.excerpt || '',
      url: `${SITE_URL}${article.url}`,
      guid: `${SITE_URL}${article.url}`,
      date: article.date,
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
