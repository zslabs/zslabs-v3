import { promises as fs } from 'fs'
import path from 'path'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import bundle from '@/app/mdx-bundler'
import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import MDXContent from '@/components/MDXContent'
import SectionTitle from '@/components/SectionTitle'

export const metadata: Metadata = {
  title: 'Terms & conditions',
}

export default async function Terms() {
  const page = await fs.readFile(
    path.resolve(process.cwd(), 'content', 'data', 'terms.mdx'),
    'utf-8'
  )

  if (!page) {
    notFound()
  }

  const { frontmatter, code } = await bundle(page)

  return (
    <>
      <MotionHeader>
        <SectionTitle>{frontmatter.title}</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <MDXContent code={code} />
      </MotionMain>
    </>
  )
}
