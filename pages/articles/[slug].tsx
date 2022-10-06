import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import type { GetStaticProps, GetStaticPaths } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

interface PostSingleProps {
  post: Post
}

export default function PostSingle({ post }: PostSingleProps) {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPost = allPosts.find((post) => {
    return post.slug === params?.slug
  })

  if (!currentPost) {
    return {
      props: {
        post: {},
      },
    }
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url)

  return {
    paths,
    fallback: false,
  }
}
