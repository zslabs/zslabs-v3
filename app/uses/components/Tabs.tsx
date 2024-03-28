'use client'

import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

import { List, ListItem } from '~components/List'

const tabs: { title: string; value: string }[] = [
  {
    title: 'Software',
    value: 'software',
  },
  {
    title: 'Gear',
    value: 'gear',
  },
]

function Software() {
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
        icon="rectangle"
        label="Rectangle"
        href="https://rectangleapp.com/"
      >
        The easiest window-management tool I've ever used.
      </ListItem>
      <ListItem icon="arc" label="Arc" href="https://arc.net/">
        Giving the new kid on the block a shot; so far, so good.
      </ListItem>
      <ListItem icon="terminal" label="Warp" href="https://www.warp.dev/">
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

function Gear() {
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
        href="https://www.apple.com/iphone-15-pro/"
        icon="iphone"
        label="iPhone 15 Pro"
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
      <ListItem
        icon="monitor"
        label="Samsung M80C"
        href="https://amzn.to/47ZTBLK"
      >
        One front and center, with the other rotated 90º to my left.
      </ListItem>
      <ListItem
        icon="mouse"
        href="https://amzn.to/3ccyLS8"
        label="Logitech MX Masters"
      >
        An absolute powerhouse of a mouse; never looking back.
      </ListItem>
      <ListItem
        icon="keyboard"
        href="https://www.keychron.com/products/keychron-q5-max-qmk-via-wireless-custom-mechanical-keyboard"
        label="Keychron Q5 Max Mechanical Keyboard"
      >
        My first mechanical keyboard, and I'm loving it so far.
      </ListItem>
      <ListItem
        href="https://www.aersf.com/travel-pack-3-black"
        icon="backpack"
        label="Aer Travel Pack 3"
      >
        I spent way too much time researching backpacks, but this is a
        much-needed, dual-purpose upgrade that I'm happy to add.
      </ListItem>
      <ListItem
        href="https://amzn.to/3TnaoSf"
        icon="dock"
        label="CalDigit TS3 Plus Dock"
      >
        Having a single cord (with power) that connects all my devices to my
        laptop is great!
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

export default function Tabs() {
  const [tab, setTab] = React.useState('software')

  return (
    <TabsPrimitive.Root value={tab} onValueChange={setTab}>
      <TabsPrimitive.TabsList
        aria-label="What I use"
        className="mb-8 flex items-center gap-6"
      >
        {tabs.map(({ title, value }) => (
          <React.Fragment key={value}>
            <TabsPrimitive.TabsTrigger
              className="relative text-lg font-medium text-slate-11 transition-colors hocus:text-slate-12 rdx-state-active:text-slate-12"
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
      </TabsPrimitive.TabsList>
      <TabsPrimitive.Content value="software">
        <Software />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="gear">
        <Gear />
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  )
}
