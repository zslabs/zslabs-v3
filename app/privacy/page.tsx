import { allStatics } from 'contentlayer/generated'
import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import MDXContent from '~components/MDXContent'
import SectionTitle from '~components/SectionTitle'

const Privacy = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = allStatics.find((p) => {
    return p.slug === 'privacy'
  })!

  return (
    <>
      <MotionHeader>
        <SectionTitle>{page.title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent content={page.body} />
      </MotionMain>
    </>
  )
}

export default Privacy
