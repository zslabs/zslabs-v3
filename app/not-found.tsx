import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import SectionTitle from '~components/SectionTitle'

export default function PageNotFound() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>404</SectionTitle>
      </MotionHeader>
      <MotionMain>It's probably something you did.</MotionMain>
    </>
  )
}
