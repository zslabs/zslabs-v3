import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import SectionTitle from '@/components/section-title'
import { getDataPage } from '@/helpers/content'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [{ title: 'Terms & conditions | Zach Schnackel' }],
  }),
  loader: async () => {
    const page = getDataPage('/src/content/data/terms.mdx')

    if (!page) {
      throw notFound()
    }

    return { title: page.frontmatter.title }
  },
  component: Terms,
})

function Terms() {
  const { title } = Route.useLoaderData()
  const page = getDataPage('/src/content/data/terms.mdx')

  return (
    <>
      <MotionHeader>
        <SectionTitle>{title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        {page && <MDXContent Component={page.component} />}
      </MotionMain>
    </>
  )
}
