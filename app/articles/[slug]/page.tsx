import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import MDXContent from '@/components/MDXContent'
import MoreArticlesLink from '@/components/MoreArticlesLink'
import SectionTitle from '@/components/SectionTitle'
import { css } from '@css/css'
import { allPosts } from '@contentlayer/generated'

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params

  const currentPost = allPosts.find((post) => {
    return post.slug === slug
  })

  if (!currentPost) {
    return {}
  }

  return {
    title: currentPost.title,
    description: currentPost.excerpt || null,
  }
}

export default async function PostSingle({ params }: Params) {
  const { slug } = await params

  const currentPost = allPosts.find((post) => {
    return post.slug === slug
  })

  if (!currentPost) {
    notFound()
  }

  const post = {
    ...currentPost,
    date: new Date(currentPost.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }

  return (
    <article>
      <MotionHeader>
        <SectionTitle>{post.title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={post.body} />
        <div
          className={css({
            marginBlockStart: '12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4',
          })}
        >
          <div
            className={css({
              fontSize: 'sm',
              textTransform: 'uppercase',
              color: 'slate.12',
              textStyle: 'mono',
            })}
            data-code
          >
            :: Published {post.date} ::
          </div>
          <MoreArticlesLink />
        </div>
      </MotionMain>
    </article>
  )
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}
