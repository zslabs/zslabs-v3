import { allPosts } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import MoreArticlesLink from '~components/MoreArticlesLink'
import SectionTitle from '~components/SectionTitle'

export default function PostSingle({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentPost = allPosts.find((post) => {
    return post.slug === params.slug
  })!

  const post = {
    ...currentPost,
    date: new Date(currentPost.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }

  return (
    <>
      <article>
        <MotionHeader>
          <SectionTitle>{post.title}</SectionTitle>
        </MotionHeader>
        <MotionMain>
          <MDXContent content={post.body} />
          <div className="flex mt-12 gap-4 justify-between items-center">
            <div className="font-mono text-sm uppercase text-slate-12">
              :: Published {post.date} ::
            </div>
            <MoreArticlesLink />
          </div>
        </MotionMain>
      </article>
    </>
  )
}

export async function generateStaticParams() {
  const posts = allPosts.map((post) => post.url)

  return posts.map((post) => ({
    slug: post,
  }))
}
