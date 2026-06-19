import type { ReactNode } from 'react'

import { css } from '@css/css'
import { inlineIcon } from '@css/patterns'
import { createFileRoute } from '@tanstack/react-router'

import { ButtonLink } from '@/components/button'
import HomepageWrapper from '@/components/homepage-wrapper'
import { List, ListItem } from '@/components/list'
import Prose from '@/components/prose'
import SectionTitle from '@/components/section-title'
import type { TextLinkProps } from '@/components/text-link'
import TextLink from '@/components/text-link'
import Article from '@/icons/article.svg?react'
import Collection from '@/icons/collection.svg?react'
import CSS from '@/icons/css.svg?react'
import Icons from '@/icons/icons.svg?react'
import ListProject from '@/icons/list.svg?react'
import Mountain from '@/icons/mountain.svg?react'
import Profile from '@/icons/profile.svg?react'
import Slack from '@/icons/slack.svg?react'
import Theming from '@/icons/theming.svg?react'
import Token from '@/icons/token.svg?react'
import Tokens from '@/icons/tokens.svg?react'
import WesAnderSlack from '@/icons/wes-anderslack.svg?react'
import X from '@/icons/x.svg?react'

export const Route = createFileRoute('/')({
  component: Homepage,
})

type ProjectItem = {
  label: string
  description: ReactNode
  icon: ReactNode
  meta: string[]
  to?: TextLinkProps['to']
  mono?: boolean
}

const PROJECTS = [
  {
    label: 'token()',
    mono: true,
    to: '/token',
    icon: <Token />,
    meta: ['Design systems'],
    description:
      'A thoughtfully curated and opinionated preset for design systems — uniting linting, tooling, and perspective to align design and engineering.',
  },
  {
    label: 'CSS infrastructure',
    icon: <CSS />,
    meta: ['Slack'],
    description:
      "As technical lead of CSS infrastructure at Slack, I've implemented technologies that help engineers write code safer and more efficiently; while also developing a migration path for our legacy build system to a unified architecture that provides the same benefits to all parts of the product. I'm an advocate for modern practices, that help us rely less on client-side logic for more performant experiences.",
  },
  {
    label: 'Theming',
    icon: <Theming />,
    meta: ['Slack', 'Figma'],
    description: (
      <>
        Technical and team lead for Slack&apos;s new theming infrastructure
        across desktop, iOS, and Android. Developed migration methods across
        thousands of assets, while simplifying both the storage, application,
        and manipulation of color preferences throughout each platform.{' '}
        <TextLink
          title="Release announcement"
          to="https://twitter.com/zslabs/status/1698304419979313651"
        >
          <X className={inlineIcon()} />
        </TextLink>
      </>
    ),
  },
  {
    label: 'Design tokens',
    icon: <Tokens />,
    meta: ['Slack', 'Figma'],
    description: (
      <>
        Build tool that uses Figma design primitives to scale across desktop,
        iOS, and Android. This design system is the basis for all experiences
        across Slack; which also includes custom{' '}
        <TextLink to="https://lightningcss.dev/transforms.html">
          Lightning CSS transforms
        </TextLink>{' '}
        to enable engineers to reference generated values quickly.
      </>
    ),
  },
  {
    label: 'Icon automation library',
    icon: <Icons />,
    meta: ['Slack', 'Figma'],
    description:
      'Build tool that integrates with the Figma API to extract and create SVG icons for use across desktop, iOS, and Android. This library takes the place of an antiquated process which normally took hours; can now be built and released across all Slack platforms in minutes.',
  },
  {
    label: 'Wes Anderslack',
    icon: <WesAnderSlack />,
    to: 'https://wesanderslack.zslabs.com',
    meta: ['Next.js', 'React Aria', 'Tailwind CSS'],
    description:
      'While the original was lost to time, I decided to bring back a fan-favorite; honoring a great director of some of my favorite movies.',
  },
  {
    label: 'List',
    to: 'https://list.zslabs.com',
    icon: <ListProject />,
    meta: ['TanStack Start', 'React Aria', 'Tailwind CSS'],
    description:
      'The best experience for monitoring activity on multiple eBay search terms.',
  },
  {
    label: 'Profile',
    to: 'https://profile.zslabs.com',
    icon: <Profile />,
    meta: ['TanStack Start', 'React Aria', 'Tailwind CSS'],
    description: 'Personalized eBay seller profiles; the way they should be.',
  },
  {
    label: 'Collection',
    to: 'https://collection.zslabs.com',
    icon: <Collection />,
    meta: ['TanStack Start', 'React Aria', 'Tailwind CSS'],
    description: 'Curated lists of eBay items; no filters needed.',
  },
] satisfies ReadonlyArray<ProjectItem>

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
          <TextLink to="https://slack.com">
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
            to="https://www.ncparks.gov/state-parks/elk-knob-state-park"
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
        <ButtonLink to="/experience" variation="contrast" glow="contrast">
          Experience
        </ButtonLink>
        <ButtonLink to="/uses" variation="default" glow="default">
          What I use
        </ButtonLink>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <List>
        {PROJECTS.map((project) => (
          <ListItem
            key={project.label}
            label={project.label}
            mono={project.mono}
            to={project.to}
            icon={project.icon}
            meta={project.meta}
          >
            {project.description}
          </ListItem>
        ))}
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
      <ButtonLink variation="default" to="/articles">
        <Article />
        Articles archive
      </ButtonLink>
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
