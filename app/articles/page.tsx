import * as React from 'react'

import type { Metadata } from 'next'

import ArticlesList from '@/components/ArticlesList'
import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import Prose from '@/components/Prose'
import SectionTitle from '@/components/SectionTitle'
import { css } from '@css/css'

export const metadata: Metadata = {
  title: 'Articles',
}

export default async function Articles() {
  return (
    <section id="articles">
      <MotionHeader>
        <SectionTitle>Articles</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div
          className={css({
            marginBlockEnd: '12',
          })}
        >
          <Prose>
            <p>
              Occassionally, I need more than 280 characters to share my
              thoughts. Here&apos;s where you&apos;ll find my brain-dumps and
              ramblings.
            </p>
          </Prose>
        </div>
        <ArticlesList />
      </MotionMain>
    </section>
  )
}
