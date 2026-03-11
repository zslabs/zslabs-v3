import { css } from '@css/css'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import MoreTokenLink from '@/components/more-token-link'
import SectionTitle from '@/components/section-title'
import { getToken } from '@/helpers/content'

export const Route = createFileRoute('/token/$slug')({
  loader: async ({ params }) => {
    const token = getToken(params.slug)

    if (!token) {
      throw notFound()
    }

    return {
      title: token.frontmatter.title,
    }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? 'token()'} | Zach Schnackel` }],
  }),
  component: TokenPostSingle,
})

function TokenPostSingle() {
  const { title } = Route.useLoaderData()
  const params = Route.useParams()
  const token = getToken(params.slug)

  if (!token) {
    throw notFound()
  }

  return (
    <article>
      <MotionHeader>
        <SectionTitle>{title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent Component={token.component} />
        <div
          className={css({
            marginBlockStart: '12',
            display: 'grid',
            placeContent: 'center',
          })}
        >
          <MoreTokenLink />
        </div>
      </MotionMain>
    </article>
  )
}
