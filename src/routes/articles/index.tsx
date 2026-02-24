import { css } from '@css/css'
import { createFileRoute } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import { BoxList, BoxListItem } from '@/components/list'
import Prose from '@/components/prose'
import SectionTitle from '@/components/section-title'
import { fetchAllPosts } from '@/helpers/server-fns'

export const Route = createFileRoute('/articles/')({
  head: () => ({
    meta: [{ title: 'Articles | Zach Schnackel' }],
  }),
  loader: async () => {
    const posts = await fetchAllPosts()
    return { posts }
  },
  component: Articles,
})

function Articles() {
  const { posts } = Route.useLoaderData()

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
