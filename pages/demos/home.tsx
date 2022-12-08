import * as React from 'react'

import type { NextPageWithLayout } from 'pages/_app'

import Button from '~components/Button'
import Icon from '~components/Icon'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import Tooltip from '~components/Tooltip'
import StaticLayout from '~layouts/StaticLayout'

function HeaderProp({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-slate-11">{label}</div>
    </div>
  )
}

function Header() {
  return (
    <header>
      <div className="flex gap-6 items-center">
        <div className="flex-1">
          <h1>
            <div className="text-2xl font-semibold">1234 Test Place</div>
            <div className="text-slate-11">Charlotte, NC 28270</div>
          </h1>
        </div>
        <Tooltip content="Save">
          <div>
            <Button iconOnly variation="overlay-hover">
              <Icon name="star" />
            </Button>
          </div>
        </Tooltip>
      </div>
    </header>
  )
}

function Nav() {
  return (
    <nav className="fixed bottom-4 max-w-[65ch] left-1/2 -translate-x-1/2 bg-overlay-9 backdrop-blur-md rounded-full py-3 px-6 text-sm">
      <ul className="flex gap-6">
        <li>
          <a href="#">Overview</a>
        </li>
        <li>
          <a href="#">Location</a>
        </li>
        <li>
          <a href="#">History</a>
        </li>
        <li>
          <a href="#">Schools</a>
        </li>
        <li>
          <a href="#">Similar</a>
        </li>
      </ul>
    </nav>
  )
}

function Meta() {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-4">
      <HeaderProp value="$675,000" label="Price" />
      <HeaderProp value="5" label="Beds" />
      <HeaderProp value="4" label="Baths" />
      <HeaderProp value="3,697 sqft" label="$183 per" />
    </div>
  )
}

function Overview() {
  return (
    <main>
      <Prose>
        This open concept home has such a cool vibe and personality! The beams
        on the vaulted ceiling, large angled picture windows, and skylights make
        a statement of style the moment you walk in the door! The open floor
        plan allows for an easy flow through the family room, dining room,
        kitchen and seamlessly extends to the large bonus room and outside to
        the oversized deck. You'll love the primary suite featuring a bright new
        bathroom w/ dual vanities and soak tub. The perfect combination of style
        and functionality - don't miss it!
      </Prose>
    </main>
  )
}

function Location() {
  return (
    <div>
      <SectionTitle>Location</SectionTitle>
    </div>
  )
}

function History() {
  return (
    <div>
      <SectionTitle>Property history</SectionTitle>
    </div>
  )
}

function Schools() {
  return (
    <div>
      <SectionTitle>Schools</SectionTitle>
    </div>
  )
}

function Similar() {
  return (
    <div>
      <SectionTitle>Similar</SectionTitle>
    </div>
  )
}

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-[calc(65ch+2rem)] px-4 py-8 md:py-12">
        <div className="space-y-12 md:space-y-16">
          <Header />
          <Meta />
          <Overview />
          <Location />
          <History />
          <Schools />
          <Similar />
        </div>
      </div>
      <Nav />
    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <StaticLayout>{page}</StaticLayout>
}

export default Home
