import { css } from '@css/css'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import MoreArticlesLink from '@/components/more-articles-link'
import SectionTitle from '@/components/section-title'
import { fetchArticleBySlug } from '@/helpers/server-fns'

export const Route = createFileRoute('/articles/$slug')({
  loader: async ({ params }) => {
    const result = await fetchArticleBySlug({ data: params.slug })

    if (!result) {
      throw notFound()
    }

    return result
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'Article'} | Zach Schnackel` },
      ...(loaderData?.excerpt
        ? [{ name: 'description', content: loaderData.excerpt }]
        : []),
    ],
  }),
  component: PostSingle,
})

function PostSingle() {
  const { title, date, code } = Route.useLoaderData()

  return (
    <article>
      <MotionHeader>
        <SectionTitle>{title}</SectionTitle>
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
            :: Published {date} ::
          </div>
          <MoreArticlesLink />
        </div>
      </MotionMain>
    </article>
  )
}
