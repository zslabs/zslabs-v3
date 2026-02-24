import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import SectionTitle from '@/components/section-title'
import { getDataPage } from '@/helpers/content'
import { fetchMDXPage } from '@/helpers/server-fns'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [{ title: 'Terms & conditions | Zach Schnackel' }],
  }),
  loader: async () => {
    const result = await fetchMDXPage({ data: '/src/content/data/terms.mdx' })

    if (!result) {
      throw notFound()
    }

    return result
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
