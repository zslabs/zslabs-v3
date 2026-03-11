import { css } from '@css/css'
import { m } from 'framer-motion'
import { Tabs as TabsRoot, TabList, Tab, TabPanel } from 'react-aria-components'

import { List, ListItem } from '@/components/list'
import Backback from '@/icons/backpack.svg?react'
import OnePassword from '@/icons/circle-lock.svg?react'
import Edge from '@/icons/edge.svg?react'
import Mimestream from '@/icons/envelope.svg?react'
import Figma from '@/icons/figma.svg?react'
import Ghost from '@/icons/ghost.svg?react'
import GitHub from '@/icons/github.svg?react'
import Headphones from '@/icons/headphones.svg?react'
import Iphone from '@/icons/iphone.svg?react'
import Keyboard from '@/icons/keyboard.svg?react'
import MBPro from '@/icons/mbpro.svg?react'
import Monitor from '@/icons/monitor.svg?react'
import Mouse from '@/icons/mouse.svg?react'
import Rectangle from '@/icons/rectangle.svg?react'
import Reminders from '@/icons/reminders.svg?react'
import Stand from '@/icons/stand.svg?react'
import VSCode from '@/icons/vs-code.svg?react'

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
        to="https://code.visualstudio.com/"
      >
        I&apos;ve tried them all; Dreamweaver, Sublime Text, BB Edit, Textmate,
        Atom, etc.
      </ListItem>
      <ListItem icon={<Figma />} label="Figma" to="https://www.figma.com">
        Previously Sketch, but Figma is just too good to ignore; with a plethora
        of community-driven plugins.
      </ListItem>
      <ListItem
        icon={<Rectangle />}
        label="Rectangle"
        to="https://rectangleapp.com/"
      >
        The easiest window-management tool I&apos;ve ever used.
      </ListItem>
      <ListItem icon={<Edge />} label="Edge" to="https://microsoft.com/edge">
        Microsoft has really stepped-up their browser game.
      </ListItem>
      <ListItem icon={<Ghost />} label="Ghostty" to="https://ghostty.org">
        The built-in terminal in VS Code is fine; though I&apos;m fortunate
        enough to have the screen real-estate for a dedicated, always-open
        terminal.
      </ListItem>
      <ListItem
        icon={<GitHub />}
        label="GitHub Desktop"
        to="https://desktop.github.com/"
      >
        I do feel more accomplished in the terminal at-times, but the interface
        and ease-of-use can&apos;t be understated for all my projects.
      </ListItem>
      <ListItem
        icon={<Mimestream />}
        label="Mimestream"
        to="https://mimestream.com/"
      >
        Handles multiple Google-based email accounts like a champ.
      </ListItem>
      <ListItem
        icon={<OnePassword />}
        label="1Password"
        to="https://1password.com"
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
        to="https://amzn.to/4dx5sog"
        icon={<MBPro />}
        label={`MacBook Pro 16" M3 Max`}
      >
        Recently upgraded from a 2019 i9; leaps and bounds better across the
        board!
      </ListItem>
      <ListItem
        to="https://www.apple.com/iphone-15-pro/"
        icon={<Iphone />}
        label="iPhone 15 Pro"
      >
        I swap for a new model every 2-3 years.
      </ListItem>
      <ListItem
        icon={<Monitor />}
        label='Dell UltraSharp 40" monitor'
        to="https://amzn.to/4iaUwh0"
      >
        5k, 120hz; what&apos;s not to love?!
      </ListItem>
      <ListItem
        icon={<Mouse />}
        to="https://amzn.to/3ccyLS8"
        label="Logitech MX Masters"
      >
        An absolute powerhouse of a mouse; never looking back.
      </ListItem>
      <ListItem
        icon={<Keyboard />}
        to="https://www.keychron.com/products/keychron-q5-max-qmk-via-wireless-custom-mechanical-keyboard"
        label="Keychron Q5 Max Mechanical Keyboard"
      >
        My first mechanical keyboard, and I&apos;m loving it so far.
      </ListItem>
      <ListItem
        icon={<Headphones />}
        to="https://amzn.to/4sJMRfr"
        label="Sony WH-1000XM6 Headphones"
      >
        While I'm no audiophile, having a comfortable pair of noise-cancelling
        headphones is a must for me; these are the best I&apos;ve ever tried.
      </ListItem>
      <ListItem
        to="https://www.aersf.com/travel-pack-3-black"
        icon={<Backback />}
        label="Aer Travel Pack 3"
      >
        I spent way too much time researching backpacks, but this is a
        much-needed, dual-purpose upgrade that I&apos;m happy to add.
      </ListItem>
      <ListItem
        to="https://amzn.to/3dGpYIp"
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
                  <m.span
                    className={css({
                      position: 'absolute',
                      insetInline: '0',
                      insetBlockEnd: '-1.5',
                      height: '0.5',
                      borderRadius: 'full',
                      backgroundLinear: 'to-r',
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
