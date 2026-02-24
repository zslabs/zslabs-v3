import { css } from '@css/css'
import { createFileRoute } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import Prose from '@/components/prose'
import SectionTitle from '@/components/section-title'
import Tabs from '@/components/use-tabs'

export const Route = createFileRoute('/uses')({
  head: () => ({
    meta: [{ title: 'Uses | Zach Schnackel' }],
  }),
  component: Uses,
})

function Uses() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>What I use</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div
          className={css({
            marginBlockEnd: '12',
          })}
        >
          <Prose>
            <p>
              A collection of the things I use on my personal device(s) that
              make me look smarter than I actually am.
            </p>
          </Prose>
        </div>
        <Tabs />
      </MotionMain>
    </>
  )
}
