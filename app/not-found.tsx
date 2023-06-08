import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import PageTitle from '~components/PageTitle'

export const metadata = {
  title: 'Page not found',
}

export default function PageNotFound() {
  return (
    <>
      <MotionHeader>
        <PageTitle>404</PageTitle>
      </MotionHeader>
      <MotionMain>It's probably something you did.</MotionMain>
    </>
  )
}
