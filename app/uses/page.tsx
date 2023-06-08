import * as React from 'react'

import Tabs from './components/Tabs'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import PageTitle from '~components/PageTitle'
import Prose from '~components/Prose'

export const metadata = {
  title: 'Uses',
}

export default function Uses() {
  return (
    <>
      <MotionHeader>
        <PageTitle>What I use</PageTitle>
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
