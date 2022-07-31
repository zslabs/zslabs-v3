import * as React from 'react'

import { allPosts } from 'contentlayer/generated'
import type { GetStaticProps } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import { List, ListItem } from '~components/List'
import SectionTitle from '~components/SectionTitle'
import type { ReducedPosts } from '~types/custom'

function Articles({ posts }: { posts: ReducedPosts }) {
  return (
    <section id="articles">
      <MotionHeader>
        <SectionTitle>Articles</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <List>
          {posts.map((post) => (
            <ListItem
              key={post.url}
              label={post.title}
              href={post.url}
              meta={post.date}
            >
              {post.excerpt || null}
            </ListItem>
          ))}
        </List>
      </MotionMain>
    </section>
  )
}

export default Articles

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  const reducedPosts: ReducedPosts = posts.map((post) => {
    return {
      title: post.title,
      date: new Date(post.date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      url: post.url,
      excerpt: post.excerpt,
    }
  })

  return {
    props: { posts: JSON.parse(JSON.stringify(reducedPosts)) },
  }
}
