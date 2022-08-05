import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { NextPage } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import { List, ListItem } from '~components/List'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

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
      <ListItem icon="1password" label="1Password">
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
      <ListItem icon="mbpro" label="MacBook Pro (15-inch, 2019)">
        Stuck with the 'ole touch-bar for now, but very much looking forward to
        giving the M2 models a shot.
      </ListItem>
      <ListItem icon="iphone" label="iPhone 13 Pro">
        I swap for a new model every 2-3 years.
      </ListItem>
      <ListItem icon="monitor" label="Monitors">
        LG 32UL750-W front and center, with a Dell UltraSharp U2720Q rotated 90º
        to my left.
      </ListItem>
      <ListItem icon="mouse" label="Logitech MX Masters">
        Took almost no time to get used to either the keyboard or mouse.
      </ListItem>
      <ListItem icon="webcam" label="Logitech Brio">
        I'll eventually switch over to Continuity in iOS 16, but this has worked
        well so far.
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
        <TabsPrimitive.Root defaultValue="desktop">
          <TabsPrimitive.TabsList
            aria-label="What I use"
            className="mb-8 flex items-center gap-6"
          >
            {tabs.map(({ title, value }, index) => (
              <>
                {index !== 0 && (
                  <span className="text-lg text-slate-11">::</span>
                )}
                <TabsPrimitive.TabsTrigger
                  key={value}
                  className="relative text-lg font-semibold text-slate-11 transition-colors before:absolute before:inset-x-0 before:-bottom-0.5 before:h-0.5 before:translate-y-1 before:rounded-full before:bg-gradient-to-r before:from-primary-9 before:to-accent-9 before:opacity-0 before:transition-all hocus:text-slate-12 rdx-state-active:translate-y-0 rdx-state-active:text-slate-12 rdx-state-active:before:opacity-100"
                  value={value}
                >
                  {title}
                </TabsPrimitive.TabsTrigger>
              </>
            ))}
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
