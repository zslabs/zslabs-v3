import * as React from 'react'

import Tabs from './components/Tabs'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'

export const metadata = {
  title: 'Uses',
}

export default function Uses() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>What I use</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div className="mb-12">
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
