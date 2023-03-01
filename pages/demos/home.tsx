import * as React from 'react'

import type { Transition } from 'framer-motion'
import { AnimatePresence, wrap, motion } from 'framer-motion'
import Image from 'next/image'
import type { NextPageWithLayout } from 'pages/_app'

import Button from '~components/Button'
import Icon from '~components/Icon'
import Prose from '~components/Prose'
import SectionTitle from '~components/SectionTitle'
import { Table, TableCell, TableHeader, TableRow } from '~components/Table'
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
    <header id="home">
      <div className="flex max-sm:flex-col gap-6 items-center">
        <div className="flex-1">
          <h1 className="max-sm:text-center">
            <div className="text-xl font-semibold">1234 Test Place</div>
            <div className="text-slate-11">Charlotte, NC 28270</div>
          </h1>
        </div>
        <div className="flex gap-6">
          <Tooltip content="Save">
            <div>
              <Button iconOnly variation="overlay-hover">
                <Icon name="star" />
              </Button>
            </div>
          </Tooltip>
          <Button variation="cta">Contact</Button>
        </div>
      </div>
    </header>
  )
}

function Nav() {
  return (
    <nav className="fixed bottom-4 max-w-[65ch] left-1/2 -translate-x-1/2 bg-overlay-9 backdrop-blur-md rounded-full py-3 px-6 text-sm">
      <ul className="flex gap-6 items-center">
        <li>
          <a href="#" className="relative">
            Overview
            <span className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-9 to-accent-9 h-1 w-1" />
          </a>
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

const images = [
  '/media/demos/home/r-architecture-0tKCSyLXqQM-unsplash.jpg',
  '/media/demos/home/r-architecture-2gDwlIim3Uw-unsplash.jpg',
  '/media/demos/home/r-architecture-A8W70m5jv_k-unsplash.jpg',
  '/media/demos/home/r-architecture-Cn87TISYij8-unsplash.jpg',
  '/media/demos/home/r-architecture-GGupkreKwxA-unsplash.jpg',
  '/media/demos/home/r-architecture-JvQ0Q5IkeMM-unsplash.jpg',
  '/media/demos/home/r-architecture-QMo-jtdyAQU-unsplash.jpg',
  '/media/demos/home/r-architecture-rOk4VSMS3Ck-unsplash.jpg',
  '/media/demos/home/r-architecture-T6d96Qrb5MY-unsplash.jpg',
  '/media/demos/home/r-architecture-UpAX8YLpRBM-unsplash.jpg',
  '/media/demos/home/r-architecture-wot0Q5sg91E-unsplash.jpg',
  '/media/demos/home/r-architecture-Y8MJFQYYjh8-unsplash.jpg',
]

const galleryVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
}

const galleryTransition: Transition = {
  x: { stiffness: 1000 },
}

function Media() {
  const [[page, direction], setPage] = React.useState([0, 0])

  const imageIndex = wrap(0, images.length, page)

  const paginate = React.useCallback(
    (newDirection: number): void => {
      setPage([page + newDirection, newDirection])
    },
    [page]
  )

  const handlePaginateLeft = React.useCallback(() => paginate(-1), [paginate])
  const handlePaginateRight = React.useCallback(() => paginate(1), [paginate])

  return (
    <div className="relative grid place-content-center overflow-hidden bg-overlay-12 aspect-video rounded-xl shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.figure
          className="absolute inset-0"
          key={page}
          custom={direction}
          variants={galleryVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={galleryTransition}
        >
          <Image
            className="object-contain"
            fill
            src={images[imageIndex]}
            alt=""
          />
        </motion.figure>
      </AnimatePresence>
      <>
        <div className="absolute top-1/2 left-2 z-10 -translate-y-1/2">
          <Button iconOnly title="Previous" onClick={handlePaginateLeft}>
            <Icon name="arrow-left" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-2 z-10 -translate-y-1/2">
          <Button iconOnly title="Next" onClick={handlePaginateRight}>
            <Icon name="arrow-right" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-full bg-overlay-11 py-1 px-2 text-sm text-slate-2 dark:text-slate-11">
          {imageIndex + 1} / {images.length}
        </div>
      </>
    </div>
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
    <main id="overview">
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
    <section>
      <SectionTitle>Location</SectionTitle>
    </section>
  )
}

function History() {
  return (
    <section>
      <SectionTitle>Property history</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Date</TableHeader>
            <TableHeader>Price</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>November 11, 2022</TableCell>
            <TableCell>$625,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isLast>September 04, 2014</TableCell>
            <TableCell isLast>$325,000</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </section>
  )
}

function Schools() {
  return (
    <section>
      <SectionTitle>Schools</SectionTitle>
    </section>
  )
}

function Similar() {
  return (
    <section>
      <SectionTitle>Similar</SectionTitle>
    </section>
  )
}

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-[calc(65ch+2rem)] px-4 py-8 md:py-12">
        <div className="space-y-12 md:space-y-16">
          <Header />
          <Meta />
          <Media />
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
