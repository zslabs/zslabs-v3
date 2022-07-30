import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import type { GetStaticProps, GetStaticPaths } from 'next'

import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import {
  fadeInAnimate,
  fadeInDownInitial,
  fadeInUpInitial,
} from '~helpers/styles'

interface PostSingleProps {
  post: Post
}

export default function PostSingle({ post }: PostSingleProps) {
  return (
    <>
      <SEO title={post.title} />

      <article>
        <motion.header initial={fadeInDownInitial} animate={fadeInAnimate}>
          <SectionTitle>{post.title}</SectionTitle>
        </motion.header>
        <motion.div initial={fadeInUpInitial} animate={fadeInAnimate}>
          <MDXContent content={post.body} />
          <div className="mt-12 font-mono text-sm uppercase text-slate-12">
            Published {post.date}
          </div>
        </motion.div>
      </article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPost = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  )

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
