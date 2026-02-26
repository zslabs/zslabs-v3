import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import SectionTitle from '@/components/section-title'
import { getDataPage } from '@/helpers/content'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [{ title: 'Privacy policy | Zach Schnackel' }],
  }),
  loader: async () => {
    const page = getDataPage('/src/content/data/privacy.mdx')

    if (!page) {
      throw notFound()
    }

    return { title: page.frontmatter.title }
  },
  component: Privacy,
})

function Privacy() {
  const { title } = Route.useLoaderData()
  const page = getDataPage('/src/content/data/privacy.mdx')

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
