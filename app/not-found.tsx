import type { Metadata } from 'next'

import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import SectionTitle from '@/components/SectionTitle'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function PageNotFound() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>404</SectionTitle>
      </MotionHeader>
      <MotionMain>It&apos;s probably something you did.</MotionMain>
    </>
  )
}
