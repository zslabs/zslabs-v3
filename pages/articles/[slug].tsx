import { allPosts } from 'contentlayer/generated'
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentPost = allPosts.find((post) => {
    return post.slug === params?.slug
  })!

  const postFormatted = {
    ...currentPost,
    date: new Date(currentPost.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }

  return {
    props: {
      post: postFormatted,
    },
  }
}

export default function PostSingle({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO title={post.title} />

      <article>
        <MotionHeader>
          <SectionTitle>{post.title}</SectionTitle>
        </MotionHeader>
        <MotionMain>
          <MDXContent content={post.body} />
          <div className="mt-12 font-mono text-sm uppercase text-slate-12">
            :: Published {post.date} ::
          </div>
        </MotionMain>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url)

  return {
    paths,
    fallback: false,
  }
}
