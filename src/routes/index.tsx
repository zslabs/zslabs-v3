import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/button'
import HomepageWrapper from '@/components/homepage-wrapper'
import { List, ListItem } from '@/components/list'
import Prose from '@/components/prose'
import SectionTitle from '@/components/section-title'
import TextLink from '@/components/text-link'
import Article from '@/icons/article.svg?react'
import Collection from '@/icons/collection.svg?react'
import CSS from '@/icons/css.svg?react'
import Icons from '@/icons/icons.svg?react'
import ListProject from '@/icons/list.svg?react'
import Mountain from '@/icons/mountain.svg?react'
import Profile from '@/icons/profile.svg?react'
import Slack from '@/icons/slack.svg?react'
import Sold from '@/icons/sold.svg?react'
import Theming from '@/icons/theming.svg?react'
import Token from '@/icons/token.svg?react'
import Tokens from '@/icons/tokens.svg?react'
import WesAnderSlack from '@/icons/wes-anderslack.svg?react'
import X from '@/icons/x.svg?react'

export const Route = createFileRoute('/')({
  component: Homepage,
})

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
              <Mountain className={inlineIcon()} />
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
          <Button
            variation="contrast"
            glow="contrast"
            render={(props) => <span {...props} />}
          >
            Experience
          </Button>
        </TextLink>
        <TextLink
          href="/uses"
          className={css({
            cursor: 'help',
          })}
        >
          <Button
            variation="default"
            glow="default"
            render={(props) => <span {...props} />}
          >
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
        <ListItem
          label="token()"
          mono
          href="https://token.zslabs.com"
          icon={<Token />}
          meta="Coming soon"
        >
          A thoughtfully curated and opinionated preset for design systems —
          uniting linting, tooling, and perspective to align design and
          engineering.
        </ListItem>
        <ListItem label="CSS infrastructure" icon={<CSS />} meta="Slack">
          As technical lead of CSS infrastructure at Slack, I&apos;ve
          implemented technologies that help engineers write code safer and more
          efficiently; while also developing a migration path for our legacy
          build system to a unified architecture that provides the same benefits
          to all parts of the product. I&apos;m an advocate for modern
          practices, that help us rely less on client-side logic for more
          performant experiences.
        </ListItem>
        <ListItem label="Theming" icon={<Theming />} meta="Slack :: Figma">
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
          <TextLink href="https://lightningcss.dev/transforms.html">
            Lightning CSS transforms
          </TextLink>{' '}
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
    <section
      id="articles"
      className={css({
        textAlign: 'center',
      })}
    >
      <TextLink href="/articles">
        <Button variation="default" render={(props) => <span {...props} />}>
          <Article />
          Articles archive
        </Button>
      </TextLink>
    </section>
  )
}

function Homepage() {
  return (
    <HomepageWrapper>
      <Intro />
      <Projects />
      <Articles />
    </HomepageWrapper>
  )
}
