'use client'

import * as React from 'react'

import { motion, useAnimation } from 'framer-motion'

import { allPosts } from 'contentlayer/generated'
import Button from '~components/Button'
import Icon from '~components/Icon'
import { List, ListItem } from '~components/List'
import MoreArticlesLink from '~components/MoreArticlesLink'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import TextLink from '~components/TextLink'
import { css } from '~css/css'
import { stack } from '~css/patterns'
import { fadeInUp } from '~helpers/styles'
import useLayoutAnimationState from '~hooks/useLayoutAnimationState'
import type { ReducedPosts } from '~types/custom'

function Intro() {
  return (
    <section id="about">
      <SectionTitle>Zach Schnackel</SectionTitle>
      <Prose>
        <p>
          I&apos;m a Software Engineer based in Charlotte, NC. My background
          involves pushing the limits of what we can build on the backend and
          how we can experience it on the frontend.
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
          <TextLink
            title="Elk Knob State Park"
            href="https://www.ncparks.gov/state-parks/elk-knob-state-park"
          >
            <span
              className={css({
                color: 'slate.12',
              })}
            >
              <Icon inline name="mountain-snow" />
            </span>
          </TextLink>
        </p>
      </Prose>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '4',
          marginBlockStart: '8',
        })}
      >
        <TextLink href="/experience">
          <Button as="div" variation="contrast">
            Experience
          </Button>
        </TextLink>
        <TextLink
          href="/uses"
          className={css({
            cursor: 'help',
          })}
        >
          <Button as="div" variation="default">
            What I use
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
        <ListItem label="Stats" icon="question" meta="Coming soon">
          The fastest, most reliable way to get insights across all your
          favorite sports.
        </ListItem>
        <ListItem label="Theming" icon="brush" meta="Slack">
          Technical and team lead for Slack&apos;s new theming infrastructure
          across desktop, iOS, and Android. Developed migration methods across
          thousands of assets, while simplifying both the storage, application,
          and manipulation of color preferences throughout each platform.{' '}
          <TextLink
            title="Release announcement"
            href="https://twitter.com/zslabs/status/1698304419979313651"
          >
            <Icon inline name="x" />
          </TextLink>
        </ListItem>
        <ListItem label="Design tokens" icon="tokens" meta="Slack">
          Build tool that uses Figma design primitives to scale across desktop,
          iOS, and Android.
        </ListItem>
        <ListItem label="Icon automation library" icon="icons" meta="Slack">
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

function Articles() {
  const allPostsSorted = allPosts.sort(
    (post1, post2) => +new Date(post2.date) - +new Date(post1.date)
  )

  const posts: ReducedPosts = allPostsSorted
    .map((post) => {
      return {
        title: post.title,
        date: new Date(post.date).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        url: post.url,
        excerpt: post.excerpt,
      }
    })
    .slice(0, 5)

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
      <div
        className={css({
          marginBlockStart: '12',
          fontSize: 'xl',
        })}
      >
        <MoreArticlesLink />
      </div>
    </section>
  )
}

function Index() {
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
      className={stack({
        gap: '12',
        md: {
          gap: '16',
        },
      })}
      initial="offscreen"
      variants={fadeInUp}
      animate={indexControls}
    >
      <Intro />
      <Projects />
      <Articles />
    </motion.div>
  )
}

export default Index
