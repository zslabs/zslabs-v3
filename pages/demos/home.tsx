import * as React from 'react'

import type { NextPageWithLayout } from 'pages/_app'

import Button from '~components/Button'
import Icon from '~components/Icon'
import StaticLayout from '~layouts/StaticLayout'

function Header() {
  return (
    <header>
      <h1>
        <div className="text-xl font-semibold">1234 Test Place</div>
        <div className="text-slate-11">Charlotte, NC 28270</div>
      </h1>
      <Button iconOnly variation="overlay-hover">
        <Icon name="star" />
      </Button>
    </header>
  )
}

const Home: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-[calc(65ch+2rem)] px-4 py-8 md:py-12">
      <Header />
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <StaticLayout>{page}</StaticLayout>
}

export default Home
