import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { createFileRoute } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import { BoxList, BoxListItem } from '@/components/list'
import Prose from '@/components/prose'
import SectionTitle from '@/components/section-title'
import { fetchAllTokens } from '@/helpers/server-fns'
import Slack from '@/icons/slack.svg?react'
import Token from '@/icons/token.svg?react'
export const Route = createFileRoute('/token/')({
  head: () => ({
    meta: [{ title: 'token() | Zach Schnackel' }],
  }),
  loader: async () => {
    const tokens = await fetchAllTokens()
    return { tokens }
  },
  component: TokenArchive,
})

function TokenArchive() {
  const { tokens } = Route.useLoaderData()

  return (
    <section id="token-archive">
      <MotionHeader>
        <SectionTitle variation="mono">
          <span
            className={css({ display: 'flex', alignItems: 'center', gap: '2' })}
          >
            <span
              className={css({
                fontSize: '3xl',
              })}
            >
              <Token />
            </span>
            token()
          </span>
        </SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div
          className={css({
            marginBlockEnd: '12',
          })}
        >
          <Prose>
            As engineering-lead of design systems and component architecture at{' '}
            <span className={inlineIcon()}>
              <Slack />
            </span>{' '}
            Slack, I&apos;ve learned what breaks down when complex products
            scale across large teams. These articles focus on fundamentals that
            apply to engineering organizations big and small.
          </Prose>
        </div>
        <BoxList>
          {tokens.map((post) => (
            <BoxListItem
              key={post.params.slug}
              label={post.title}
              to={post.to}
              params={post.params}
              poster={post.poster}
              comingSoon={!post.published}
            />
          ))}
        </BoxList>
      </MotionMain>
    </section>
  )
}
