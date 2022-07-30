import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import type { GetStaticProps, GetStaticPaths } from 'next'

import MDXContent from '~components/MDXContent'
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
          title
        </motion.header>
        <motion.div initial={fadeInUpInitial} animate={fadeInAnimate}>
          <MDXContent content={post.body} />
        </motion.div>
      </article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPost = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  )

  return {
    props: {
      post: currentPost,
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
