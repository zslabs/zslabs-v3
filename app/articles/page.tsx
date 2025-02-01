import { promises as fs } from 'fs'
import path from 'path'

import * as React from 'react'

import type { Metadata } from 'next'

import bundle from '@/app/mdx-bundler'
import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import { BoxList, BoxListItem } from '@/components/List'
import Prose from '@/components/Prose'
import SectionTitle from '@/components/SectionTitle'
import { css } from '@css/css'

export const metadata: Metadata = {
  title: 'Articles',
}

async function getAllPosts(limit = null) {
  const directoryPath = path.join(process.cwd(), 'content', 'articles')

  try {
    const filenames = await fs.readdir(directoryPath)

    const fileContents = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(directoryPath, filename)
        const content = await fs.readFile(filePath, 'utf8')

        const { frontmatter, code } = await bundle(content)

        return {
          date: frontmatter.date,
          dateFormatted: new Date(frontmatter.date).toLocaleDateString(
            'en-us',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          ),
          url: `/articles/${filename.replace(/\.mdx?$/, '')}`,
          excerpt: frontmatter.excerpt,
          title: frontmatter.title,
          code,
        }
      })
    )

    // Sort files by date (assuming ISO 8601 format, e.g., "2024-01-01")
    fileContents.sort((a, b) => new Date(b.date) - new Date(a.date))

    return limit && limit > 0 ? fileContents.slice(0, limit) : fileContents
  } catch (err) {
    console.error('Error reading files:', err)

    throw err
  }
}

export default async function Articles() {
  const posts = await getAllPosts()

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
        <BoxList>
          {posts.map((post) => (
            <BoxListItem
              key={post.url}
              label={post.title}
              href={post.url}
              meta={post.dateFormatted}
            >
              {post.excerpt || null}
            </BoxListItem>
          ))}
        </BoxList>
      </MotionMain>
    </section>
  )
}
