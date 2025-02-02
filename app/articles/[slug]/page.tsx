import { promises as fs } from 'fs'
import path from 'path'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import bundle from '@/app/mdx-bundler'
import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import MDXContent from '@/components/MDXContent'
import MoreArticlesLink from '@/components/MoreArticlesLink'
import SectionTitle from '@/components/SectionTitle'
import { css } from '@css/css'

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params

  const currentPost = await fs.readFile(
    path.resolve(process.cwd(), 'content', 'articles', `${slug}.mdx`),
    'utf-8'
  )

  if (!currentPost) {
    return {}
  }

  const { frontmatter } = await bundle(currentPost)

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  }
}

export default async function PostSingle({ params }: Params) {
  const { slug } = await params

  const currentPost = await fs.readFile(
    path.resolve(process.cwd(), 'content', 'articles', `${slug}.mdx`),
    'utf-8'
  )

  if (!currentPost) {
    notFound()
  }

  const { frontmatter, code } = await bundle(currentPost)

  const post = {
    title: frontmatter.title,
    date: new Date(frontmatter.date).toLocaleDateString('en-us', {
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
        <MDXContent code={code} />
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
  const posts = (
    await fs.readdir(path.resolve(process.cwd(), 'content', 'articles'))
  ).map((post) => post.replace('.mdx', ''))

  return posts.map((post) => ({
    slug: post,
  }))
}
