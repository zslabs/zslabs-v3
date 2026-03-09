import { BoxList, BoxListItem } from '@/components/list'
import { getAllPosts } from '@/helpers/content'

export default async function ArticlesList({ limit }: { limit?: number }) {
  const posts = await getAllPosts(limit)

  return (
    <BoxList>
      {posts.map((post) => (
        <BoxListItem
          key={post.params.slug}
          label={post.title}
          to={post.to}
          params={post.params}
          meta={[post.date]}
        >
          {post.excerpt || null}
        </BoxListItem>
      ))}
    </BoxList>
  )
}
