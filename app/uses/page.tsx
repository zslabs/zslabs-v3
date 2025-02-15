import * as React from 'react'

import type { Metadata } from 'next'

import Tabs from './components/Tabs'

import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import Prose from '@/components/Prose'
import SectionTitle from '@/components/SectionTitle'
import { css } from '@css/css'

export const metadata: Metadata = {
  title: 'Uses',
}

export default function Uses() {
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
