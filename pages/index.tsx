import fs from 'fs'

import * as React from 'react'

import { allPosts } from 'contentlayer/generated'
import type { GetStaticProps, NextPage } from 'next'

import useLayoutAnimationState from '~hooks/useLayoutAnimationState'
import { getRssXml } from '~lib/rss'

const Home: NextPage = () => {
  const done = useLayoutAnimationState((state) => state.done)

  const pageAnimation = React.useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('do index page animation')
  }, [])

  React.useEffect(() => {
    if (done) {
      pageAnimation()
    }
  }, [done, pageAnimation])

  return <>home</>
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  const reducedPosts = posts.map((post) => {
    return {
      title: post.title,
      date: post.date,
      url: post.url,
    }
  })

  // Generate RSS feed
  const rss = getRssXml(reducedPosts)

  fs.writeFileSync('./public/rss.xml', rss)

  return {
    props: {},
  }
}
