'use client'

import * as React from 'react'

import { motion } from 'framer-motion'
import { Tabs as TabsRoot, TabList, Tab, TabPanel } from 'react-aria-components'

import { List, ListItem } from '@/components/List'
import OnePassword from '@/icons/1password.svg'
import Backback from '@/icons/backpack.svg'
import Edge from '@/icons/edge.svg'
import Figma from '@/icons/figma.svg'
import Ghost from '@/icons/ghost.svg'
import GitHub from '@/icons/github.svg'
import Iphone from '@/icons/iphone.svg'
import Keyboard from '@/icons/keyboard.svg'
import MBPro from '@/icons/mbpro.svg'
import Mimestream from '@/icons/mimestream.svg'
import Monitor from '@/icons/monitor.svg'
import Mouse from '@/icons/mouse.svg'
import Rectangle from '@/icons/rectangle.svg'
import Reminders from '@/icons/reminders.svg'
import Stand from '@/icons/stand.svg'
import VSCode from '@/icons/vs-code.svg'
import Watch from '@/icons/watch.svg'
import { css } from '@css/css'

const tabs = [
  { id: 'software', title: 'Software' },
  { id: 'gear', title: 'Gear' },
]

function Software() {
  return (
    <List>
      <ListItem
        icon={<VSCode />}
        label="VS Code"
        href="https://code.visualstudio.com/"
      >
        I&apos;ve tried them all; Dreamweaver, Sublime Text, BB Edit, Textmate,
        Atom, etc.
      </ListItem>
      <ListItem icon={<Figma />} label="Figma" href="https://www.figma.com">
        Previously Sketch, but Figma is just too good to ignore; with a plethora
        of community-driven plugins.
      </ListItem>
      <ListItem
        icon={<Rectangle />}
        label="Rectangle"
        href="https://rectangleapp.com/"
      >
        The easiest window-management tool I&apos;ve ever used.
      </ListItem>
      <ListItem icon={<Edge />} label="Edge" href="https://microsoft.com/edge">
        Microsoft has really stepped-up their browser game.
      </ListItem>
      <ListItem icon={<Ghost />} label="Ghostty" href="https://ghostty.org">
        The built-in terminal in VS Code is fine; though I&apos;m fortunate
        enough to have the screen real-estate for a dedicated, always-open
        terminal.
      </ListItem>
      <ListItem
        icon={<GitHub />}
        label="GitHub Desktop"
        href="https://desktop.github.com/"
      >
        I do feel more accomplished in the terminal at-times, but the interface
        and ease-of-use can&apos;t be understated for all my projects.
      </ListItem>
      <ListItem
        icon={<Mimestream />}
        label="Mimestream"
        href="https://mimestream.com/"
      >
        Handles multiple Google-based email accounts like a champ.
      </ListItem>
      <ListItem
        icon={<OnePassword />}
        label="1Password"
        href="https://1password.com"
      >
        Synced across all my devices; never had an issue.
      </ListItem>
      <ListItem icon={<Reminders />} label="Apple Reminders">
        I&apos;ve tried a few different apps, but the iCloud integration and
        feature-set has always been enough for me.
      </ListItem>
    </List>
  )
}

function Gear() {
  return (
    <List>
      <ListItem
        href="https://amzn.to/4dx5sog"
        icon={<MBPro />}
        label={`MacBook Pro 16" M3 Max`}
      >
        Recently upgraded from a 2019 i9; leaps and bounds better across the
        board!
      </ListItem>
      <ListItem
        href="https://www.apple.com/iphone-15-pro/"
        icon={<Iphone />}
        label="iPhone 15 Pro"
      >
        I swap for a new model every 2-3 years.
      </ListItem>
      <ListItem
        href="https://amzn.to/3ABcerh"
        icon={<Watch />}
        label="Apple Watch Series 7 45mm"
      >
        Longtime Fitbit user, but notifications work so much better now. I
        thought I&apos;d miss the 4-5 days of battery life, but I get a solid 2
        days.
      </ListItem>
      <ListItem
        icon={<Monitor />}
        label='Dell UltraSharp 40" monitor'
        href="https://amzn.to/4iaUwh0"
      >
        5k, 120hz; what&apos;s not to love?!
      </ListItem>
      <ListItem
        icon={<Mouse />}
        href="https://amzn.to/3ccyLS8"
        label="Logitech MX Masters"
      >
        An absolute powerhouse of a mouse; never looking back.
      </ListItem>
      <ListItem
        icon={<Keyboard />}
        href="https://www.keychron.com/products/keychron-q5-max-qmk-via-wireless-custom-mechanical-keyboard"
        label="Keychron Q5 Max Mechanical Keyboard"
      >
        My first mechanical keyboard, and I&apos;m loving it so far.
      </ListItem>
      <ListItem
        href="https://www.aersf.com/travel-pack-3-black"
        icon={<Backback />}
        label="Aer Travel Pack 3"
      >
        I spent way too much time researching backpacks, but this is a
        much-needed, dual-purpose upgrade that I&apos;m happy to add.
      </ListItem>
      <ListItem
        href="https://amzn.to/3dGpYIp"
        icon={<Stand />}
        label="Rain Design mStand"
      >
        Had this since 2016 and still looks/works great.
      </ListItem>
    </List>
  )
}

export default function Tabs() {
  return (
    <TabsRoot defaultSelectedKey="software">
      <TabList
        aria-label="What I use"
        items={tabs}
        className={css({
          marginBlockEnd: '8',
          display: 'flex',
          gap: '6',
          alignItems: 'center',
        })}
      >
        {(item) => (
          <Tab
            className={css({
              position: 'relative',
              fontSize: 'lg',
              fontWeight: 'medium',
              color: 'slate.11',
              transitionProperty: 'color',
              transitionDuration: 'fast',
              transitionTimingFunction: 'default',
              cursor: 'pointer',

              _hover: {
                color: 'slate.12',
              },

              _focus: {
                outline: 'none',
              },

              _selected: {
                color: 'slate.12',
              },
            })}
          >
            {({ isSelected }) => (
              <>
                {item.title}
                {isSelected && (
                  <motion.span
                    className={css({
                      position: 'absolute',
                      insetInline: '0',
                      insetBlockEnd: '-1.5',
                      height: '0.5',
                      borderRadius: 'full',
                      backgroundGradient: 'to-r',
                      gradientFrom: 'blue.9',
                      gradientTo: 'iris.9',
                    })}
                    layoutId="underline"
                  />
                )}
              </>
            )}
          </Tab>
        )}
      </TabList>
      <TabPanel id="software">
        <Software />
      </TabPanel>
      <TabPanel id="gear">
        <Gear />
      </TabPanel>
    </TabsRoot>
  )
}
