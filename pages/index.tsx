import fs from 'fs'

import * as React from 'react'

import { allPosts } from 'contentlayer/generated'
import { motion, useAnimation } from 'framer-motion'
import type { GetStaticProps } from 'next'

import Button from '~components/Button'
import Icon from '~components/Icon'
import { List, ListItem } from '~components/List'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import TextLink from '~components/TextLink'
import Tooltip from '~components/Tooltip'
import { fadeInUp } from '~helpers/styles'
import useLayoutAnimationState from '~hooks/useLayoutAnimationState'
import { getRssXml } from '~lib/rss'
import type { ReducedPosts } from '~types/custom'

function Intro() {
  return (
    <section id="about">
      <SectionTitle>Zach Schnackel</SectionTitle>
      <Prose>
        <p>
          I'm a Software Engineer based in Boone, NC. My background involves
          pushing the limits of what we can build on the backend and how we can
          experience it on the frontend.
        </p>
        <p>
          Happy to be part of the design infrastructure team at{' '}
          <TextLink href="https://slack.com">
            <Icon inline name="slack" /> Slack
          </TextLink>
          ; building tools to help designers and engineers collaborate more
          efficiently.
        </p>
        <p>
          Outside of technology, I love spending time with my family and hiking
          in the NC mountains{' '}
          <span className="text-slate-12">
            <Icon inline name="mountain-snow" />
          </span>
        </p>
      </Prose>
      <div className="mt-8 flex justify-between gap-4">
        <TextLink href="/experience">
          <Button as="div" variation="contrast">
            Experience
          </Button>
        </TextLink>
        <TextLink href="/uses">
          <Button as="div" variation="default">
            Uses
          </Button>
        </TextLink>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <List>
        <ListItem label="Design tokens" icon="tokens" meta="Internal">
          Build tool that uses Figma design primitives to scale across desktop,
          iOS, and Android.
        </ListItem>
        <ListItem label="Icon automation library" icon="icons" meta="Internal">
          Build tool that integrates with Figma API to extract and create SVG
          icons for use across desktop, iOS, and Android.
        </ListItem>
        <ListItem
          label="List"
          href="https://list.zslabs.com"
          icon="list"
          meta="Next.js :: Radix-UI"
        >
          The best experience for monitoring activity on multiple eBay search
          terms.
        </ListItem>
        <ListItem
          label="Sold"
          href="https://sold.zslabs.com"
          icon="sold"
          meta="Next.js :: Radix-UI"
        >
          Toolkit for gauging market-prices and trends on eBay.
        </ListItem>
      </List>
    </section>
  )
}

function Articles({ posts }: { posts: ReducedPosts }) {
  return (
    <section id="articles">
      <SectionTitle>Articles</SectionTitle>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.url}
            label={post.title}
            href={post.url}
            meta={post.date}
          >
            {post.excerpt || null}
          </ListItem>
        ))}
      </List>
      <div className="mt-12 w-fit text-xl">
        <Tooltip content="More articles">
          <TextLink href="/articles">
            <Icon name="more" />
          </TextLink>
        </Tooltip>
      </div>
    </section>
  )
}

function Index({ posts }: { posts: ReducedPosts }) {
  const done = useLayoutAnimationState((state) => state.done)
  const indexControls = useAnimation()

  const pageAnimation = React.useCallback(async () => {
    indexControls.start('onscreen')
  }, [indexControls])

  React.useEffect(() => {
    if (done) {
      pageAnimation()
    }
  }, [done, pageAnimation])

  return (
    <motion.div
      className="space-y-12 md:space-y-16"
      initial="offscreen"
      variants={fadeInUp}
      animate={indexControls}
    >
      <Intro />
      <Projects />
      <Articles posts={posts} />
    </motion.div>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  const reducedPosts: ReducedPosts = posts.map((post) => {
    return {
      title: post.title,
      date: post.date,
      url: post.url,
      excerpt: post.excerpt,
    }
  })

  // Generate RSS feed
  const rss = getRssXml(reducedPosts)

  fs.writeFileSync('./public/rss.xml', rss)

  const postsForPage = reducedPosts.splice(0, 3).map((post) => ({
    ...post,
    date: new Date(post.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }))

  return {
    props: { posts: JSON.parse(JSON.stringify(postsForPage)) },
  }
}
