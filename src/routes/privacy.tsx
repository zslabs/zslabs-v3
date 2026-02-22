import { createFileRoute, notFound } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import MDXContent from '@/components/mdx-content'
import SectionTitle from '@/components/section-title'
import { fetchMDXPage } from '@/helpers/server-fns'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [{ title: 'Privacy policy | Zach Schnackel' }],
  }),
  loader: async () => {
    const result = await fetchMDXPage({ data: 'content/data/privacy.mdx' })

    if (!result) {
      throw notFound()
    }

    return result
  },
  component: Privacy,
})

function Privacy() {
  const { title, code } = Route.useLoaderData()

  return (
    <>
      <MotionHeader>
        <SectionTitle>{title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent code={code} />
      </MotionMain>
    </>
  )
}
