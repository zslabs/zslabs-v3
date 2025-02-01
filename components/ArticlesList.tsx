import { BoxList, BoxListItem } from '@/components/List'
import { getAllPosts } from '@/helpers/content'

export default async function ArticlesList({ limit }: { limit?: number }) {
  const posts = await getAllPosts(limit)

  return (
    <BoxList>
      {posts.map((post) => (
        <BoxListItem
          key={post.url}
          label={post.title}
          href={post.url}
          meta={post.date}
        >
          {post.excerpt || null}
        </BoxListItem>
      ))}
    </BoxList>
  )
}
