import * as React from 'react'

import Link from 'next/link'

import posts from '@/articles.json'
import { DivButton } from '@/components/Button'
import HomepageWrapper from '@/components/HomepageWrapper'
import { BoxList, BoxListItem, List, ListItem } from '@/components/List'
import MoreArticlesLink from '@/components/MoreArticlesLink'
import Prose from '@/components/Prose'
import SectionTitle from '@/components/SectionTitle'
import TextLink from '@/components/TextLink'
import Brush from '@/icons/brush.svg'
import Collection from '@/icons/collection.svg'
import CSS from '@/icons/css.svg'
import Icons from '@/icons/icons.svg'
import ListProject from '@/icons/list.svg'
import MountainSnow from '@/icons/mountain-snow.svg'
import Profile from '@/icons/profile.svg'
import Slack from '@/icons/slack.svg'
import Sold from '@/icons/sold.svg'
import Tokens from '@/icons/tokens.svg'
import WesAnderSlack from '@/icons/wes-anderslack.svg'
import X from '@/icons/x.svg'
import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'

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
            <Slack className={inlineIcon()} /> Slack
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
              <MountainSnow className={inlineIcon()} />
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
          <DivButton variation="contrast">Experience</DivButton>
        </TextLink>
        <TextLink
          href="/uses"
          className={css({
            cursor: 'help',
          })}
        >
          <DivButton variation="default">What I use</DivButton>
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
        <ListItem label="CSS infrastructure" icon={<CSS />} meta="Slack">
          As technical lead of CSS infrastructure at Slack, I&apos;ve
          implemented technologies that help engineers write code safer and more
          efficiently; while also developing a migration path for our legacy
          build system to a unified architecture that provides the same benefits
          to all parts of the product. I&apos;m an advocate for modern
          practices, that help us rely less on client-side logic for more
          performant experiences.
        </ListItem>
        <ListItem label="Theming" icon={<Brush />} meta="Slack :: Figma">
          Technical and team lead for Slack&apos;s new theming infrastructure
          across desktop, iOS, and Android. Developed migration methods across
          thousands of assets, while simplifying both the storage, application,
          and manipulation of color preferences throughout each platform.{' '}
          <TextLink
            title="Release announcement"
            href="https://twitter.com/zslabs/status/1698304419979313651"
          >
            <X className={inlineIcon()} />
          </TextLink>
        </ListItem>
        <ListItem label="Design tokens" icon={<Tokens />} meta="Slack :: Figma">
          Build tool that uses Figma design primitives to scale across desktop,
          iOS, and Android. This design system is the basis for all experiences
          across Slack; which also includes custom{' '}
          <Link href="https://lightningcss.dev/transforms.html" target="_blank">
            Lightning CSS transforms
          </Link>{' '}
          to enable engineers to reference generated values quickly.
        </ListItem>
        <ListItem
          label="Icon automation library"
          icon={<Icons />}
          meta="Slack :: Figma"
        >
          Build tool that integrates with the Figma API to extract and create
          SVG icons for use across desktop, iOS, and Android. This library takes
          the place of an antiquated process which normally took hours; can now
          be built and released across all Slack platforms in minutes.
        </ListItem>
        <ListItem
          label="Wes Anderslack"
          icon={<WesAnderSlack />}
          href="https://wesanderslack.zslabs.com"
          meta="Next.js :: React Aria Components :: Tailwind CSS"
        >
          While the original was lost to time, I decided to bring back a
          fan-favorite; honoring a great director of some of my favorite movies.
        </ListItem>
        <ListItem
          label="Profile"
          href="https://profile.zslabs.com"
          icon={<Profile />}
          meta="Next.js :: React Aria Components :: Tailwind CSS"
        >
          Personalized eBay seller profiles; the way they should be.
        </ListItem>
        <ListItem
          label="Collection"
          href="https://collection.zslabs.com"
          icon={<Collection />}
          meta="Next.js :: React Aria Components :: Tailwind CSS"
        >
          Curated lists of eBay items; no filters needed.
        </ListItem>
        <ListItem
          label="List"
          href="https://list.zslabs.com"
          icon={<ListProject />}
          meta="Next.js :: Radix UI :: Tailwind CSS"
        >
          The best experience for monitoring activity on multiple eBay search
          terms.
        </ListItem>
        <ListItem
          label="Sold"
          href="https://sold.zslabs.com"
          icon={<Sold />}
          meta="Next.js :: React Aria Components :: Tailwind CSS"
        >
          Toolkit for gauging market-prices and trends on eBay.
        </ListItem>
      </List>
    </section>
  )
}

function Articles() {
  return (
    <section id="articles">
      <SectionTitle>Articles</SectionTitle>
      <BoxList>
        {posts.slice(0, 6).map((post) => (
          <BoxListItem
            key={post.url}
            label={post.title}
            href={post.url}
            meta={post.date}
          >
            {post.excerpt || null}
          </BoxListItem>
        ))}
      </BoxList>
      <div
        className={css({
          marginBlockStart: '12',
          fontSize: 'xl',
          width: 'fit',
        })}
      >
        <MoreArticlesLink />
      </div>
    </section>
  )
}

export default function Homepage() {
  return (
    <HomepageWrapper>
      <Intro />
      <Projects />
      <Articles />
    </HomepageWrapper>
  )
}
