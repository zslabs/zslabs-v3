import type { NextPage } from 'next'

import { MotionHeader, MotionMain } from '~components/ContentWrappers'
import { List, ListItem } from '~components/List'
import SectionTitle from '~components/SectionTitle'
import SEO from '~components/SEO'

function Desktop() {
  return (
    <section id="desktop">
      <SectionTitle>Desktop software</SectionTitle>
      <List>
        <ListItem
          icon="vs-code"
          label="VS Code"
          href="https://code.visualstudio.com/"
        >
          I've tried them all; Dreamweaver, Sublime Text, BB Edit, Textmate,
          Atom, etc.
        </ListItem>
        <ListItem icon="figma" label="Figma" href="https://www.figma.com">
          Previously Sketch, but Figma is just too good to ignore; with a
          plethora of community-driven plugins.
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
          More recently Firefox, but Chrome's consistency keeps bringing me
          back.
        </ListItem>
        <ListItem icon="iterm" label="iTerm2" href="https://iterm2.com/">
          The built-in terminal in VS Code is fine; though I'm fortunate enough
          to have the screen real-estate for a dedicated, always-open terminal.
        </ListItem>
        <ListItem
          icon="github"
          label="GitHub Desktop"
          href="https://desktop.github.com/"
        >
          I do feel more accomplished in the terminal at-times, but the
          interface and ease-of-use can't be understated for all my projects.
        </ListItem>
        <ListItem
          icon="mimestream"
          label="Mimestream"
          href="https://mimestream.com/"
        >
          Handles multiple Google-based email accounts like a champ.
        </ListItem>
        <ListItem icon="reminders" label="Apple Reminders">
          I've tried a few different apps, but the iCloud integration and
          feature-set has always been enough for me.
        </ListItem>
      </List>
    </section>
  )
}

function Hardware() {
  return (
    <section id="hardware">
      <SectionTitle>Hardware</SectionTitle>
      <List>
        <ListItem icon="mbpro" label="MacBook Pro (15-inch, 2019)">
          Stuck with the touch-bar for now, but very much looking forward to
          giving the M2 models a shot.
        </ListItem>
        <ListItem icon="iphone" label="iPhone 13 Pro">
          I swap for a new model every 2-3 years.
        </ListItem>
        <ListItem icon="monitor" label="Monitors">
          LG 32UL750-W front and center, with a Dell UltraSharp U2720Q rotated
          90º to my left.
        </ListItem>
      </List>
    </section>
  )
}

const Uses: NextPage = () => {
  return (
    <>
      <SEO title="Uses" />
      <MotionHeader>
        <SectionTitle>Uses</SectionTitle>
      </MotionHeader>
      <MotionMain>
        A collection of the things I use on my personal device(s) that make me
        look smarter than I actually am.
        <div className="my-12 space-y-12 md:space-y-16">
          <Desktop />
          <Hardware />
        </div>
      </MotionMain>
    </>
  )
}

export default Uses
