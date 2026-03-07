import { css } from '@css/css'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import MoreArticlesLink from '@/components/more-articles-link'
import SectionTitle from '@/components/section-title'
import { getArticle } from '@/helpers/content'

export const Route = createFileRoute('/articles/$slug')({
  loader: async ({ params }) => {
    const article = getArticle(params.slug)

    if (!article) {
      throw notFound()
    }

    const { frontmatter } = article

    return {
      title: frontmatter.title,
      date: new Date(frontmatter.date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      excerpt: frontmatter.excerpt,
    }
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
  const { title, date } = Route.useLoaderData()
  const params = Route.useParams()
  const article = getArticle(params.slug)

  return (
    <article>
      <MotionHeader>
        <SectionTitle>{title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        {article && <MDXContent Component={article.component} />}
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
              color: 'slate.11',
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
