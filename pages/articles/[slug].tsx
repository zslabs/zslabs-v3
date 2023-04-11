import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'

import { allPosts } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import Icon from '~components/Icon'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'

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
          <div className="flex mt-12 gap-4 justify-between items-center">
            <div className="font-mono text-sm uppercase text-slate-12">
              :: Published {post.date} ::
            </div>
            <Tooltip content="More articles">
              <TextLink href="/articles">
                <Icon name="more" />
              </TextLink>
            </Tooltip>
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
