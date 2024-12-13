import * as React from 'react'

import type { Metadata } from 'next'

import { allPosts } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import { BoxList, BoxListItem } from '~components/List'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import { css } from '~css/css'
import type { ReducedPosts } from '~types/custom'

export const metadata: Metadata = {
  title: 'Articles',
}

function Articles() {
  const allPostsSorted = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  const posts: ReducedPosts = allPostsSorted.map((post) => {
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

  return (
    <section id="articles">
      <MotionHeader>
        <SectionTitle>Articles</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div
          className={css({
            marginBlockEnd: '12',
          })}
        >
          <Prose>
            <p>
              Occassionally, I need more than 280 characters to share my
              thoughts. Here&apos;s where you&apos;ll find my brain-dumps and
              ramblings.
            </p>
          </Prose>
        </div>
        <BoxList>
          {posts.map((post) => (
            <BoxListItem
              key={post.url}
              label={post.title}
              href={post.url}
              meta={post.date}
            >
              {post.excerpt || null}
            </BoxListItem>
          ))}
        </BoxList>
      </MotionMain>
    </section>
  )
}

export default Articles
