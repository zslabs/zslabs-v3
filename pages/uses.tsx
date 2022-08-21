import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { AnimateSharedLayout, motion } from 'framer-motion'
import type { NextPage } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import { List, ListItem } from '~components/List'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'
import TextLink from '~components/TextLink'

function Desktop() {
  return (
    <List>
      <ListItem
        icon="vs-code"
        label="VS Code"
        href="https://code.visualstudio.com/"
      >
        I've tried them all; Dreamweaver, Sublime Text, BB Edit, Textmate, Atom,
        etc.
      </ListItem>
      <ListItem icon="figma" label="Figma" href="https://www.figma.com">
        Previously Sketch, but Figma is just too good to ignore; with a plethora
        of community-driven plugins.
      </ListItem>
      <ListItem
        icon="tweetbot"
        label="Tweetbot"
        href="https://tapbots.com/tweetbot/mac/"
      >
        I use Twitter as my main news source for all things development.
        Tweetbot removes all ads and displays items in chronological order.
      </ListItem>
      <ListItem
        icon="rectangle"
        label="Rectangle"
        href="https://rectangleapp.com/"
      >
        The easiest window-management tool I've ever used.
      </ListItem>
      <ListItem
        icon="chrome"
        label="Google Chrome"
        href="https://www.google.com/chrome"
      >
        More recently Firefox, but Chrome's consistency keeps bringing me back.
      </ListItem>
      <ListItem icon="iterm" label="iTerm2" href="https://iterm2.com/">
        The built-in terminal in VS Code is fine; though I'm fortunate enough to
        have the screen real-estate for a dedicated, always-open terminal.
      </ListItem>
      <ListItem
        icon="github"
        label="GitHub Desktop"
        href="https://desktop.github.com/"
      >
        I do feel more accomplished in the terminal at-times, but the interface
        and ease-of-use can't be understated for all my projects.
      </ListItem>
      <ListItem
        icon="mimestream"
        label="Mimestream"
        href="https://mimestream.com/"
      >
        Handles multiple Google-based email accounts like a champ.
      </ListItem>
      <ListItem icon="1password" label="1Password" href="https://1password.com">
        Synced across all my devices; never had an issue.
      </ListItem>
      <ListItem icon="reminders" label="Apple Reminders">
        I've tried a few different apps, but the iCloud integration and
        feature-set has always been enough for me.
      </ListItem>
    </List>
  )
}

function Hardware() {
  return (
    <List>
      <ListItem
        href="https://amzn.to/3AuEVVV"
        icon="mbpro"
        label="MacBook Pro (15-inch, 2019)"
      >
        Stuck with the 'ole touch-bar for now, but very much looking forward to
        giving the M2 models a shot.
      </ListItem>
      <ListItem
        href="https://amzn.to/3QXI333"
        icon="iphone"
        label="iPhone 13 Pro"
      >
        I swap for a new model every 2-3 years.
      </ListItem>
      <ListItem
        href="https://amzn.to/3ABcerh"
        icon="watch"
        label="Apple Watch Series 7 45mm"
      >
        Longtime Fitbit user, but notifications work so much better now. I
        thought I'd miss the 4-5 days of battery life, but I get a solid 2 days.
      </ListItem>
      <ListItem icon="monitor" label="Monitors">
        <TextLink href="https://amzn.to/3K5ZSe9">LG 32UL750-W</TextLink> front
        and center, with a{' '}
        <TextLink href="https://amzn.to/3pxBokr">
          Dell UltraSharp U2720Q
        </TextLink>{' '}
        rotated 90º to my left.
      </ListItem>
      <ListItem icon="mouse" label="Logitech MX Masters">
        Took almost no time to get used to either the{' '}
        <TextLink href="https://amzn.to/3PCyVzG">keyboard</TextLink> or{' '}
        <TextLink href="https://amzn.to/3ccyLS8">mouse</TextLink>.
      </ListItem>
      <ListItem href="https://amzn.to/3QEn99r" icon="webcam" label="Lumina">
        I'll eventually switch over to Continuity in iOS 16, but this has worked
        well so far. I used to use a{' '}
        <TextLink href="https://amzn.to/3T1SQel">Logitech Brio</TextLink>.
      </ListItem>
      <ListItem
        href="https://amzn.to/3dGpYIp"
        icon="stand"
        label="Rain Design mStand"
      >
        Had this since 2016 and still looks/works great.
      </ListItem>
    </List>
  )
}

const tabs: { title: string; value: string }[] = [
  {
    title: 'Desktop',
    value: 'desktop',
  },
  {
    title: 'Hardware',
    value: 'hardware',
  },
]

const Uses: NextPage = () => {
  const [tab, setTab] = React.useState('desktop')
  return (
    <>
      <SEO title="What I use" />
      <MotionHeader>
        <SectionTitle>What I use</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <div className="mb-12">
          <Prose>
            <p>
              A collection of the things I use on my personal device(s) that
              make me look smarter than I actually am.
            </p>
          </Prose>
        </div>
        <TabsPrimitive.Root value={tab} onValueChange={setTab}>
          <TabsPrimitive.TabsList
            aria-label="What I use"
            className="mb-8 flex items-center gap-6"
          >
            <AnimateSharedLayout>
              {tabs.map(({ title, value }) => (
                <React.Fragment key={value}>
                  <TabsPrimitive.TabsTrigger
                    className="relative text-lg font-semibold text-slate-11 transition-colors hocus:text-slate-12 rdx-state-active:text-slate-12"
                    value={value}
                  >
                    {title}
                    {value === tab && (
                      <motion.span
                        className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-primary-9 to-accent-9"
                        layoutId="underline"
                      />
                    )}
                  </TabsPrimitive.TabsTrigger>
                </React.Fragment>
              ))}
            </AnimateSharedLayout>
          </TabsPrimitive.TabsList>
          <TabsPrimitive.Content value="desktop">
            <Desktop />
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value="hardware">
            <Hardware />
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </MotionMain>
    </>
  )
}

export default Uses
