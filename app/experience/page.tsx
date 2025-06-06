import * as React from 'react'

import type { Metadata } from 'next'

import LinkedIn from './components/LinkedIn'

import { MotionHeader, MotionMain } from '@/components/ContentWrappers'
import { List, ListItem } from '@/components/List'
import SectionTitle from '@/components/SectionTitle'
import DigitalOcean from '@/icons/digitalocean.svg'
import Gremlin from '@/icons/gremlin.svg'
import Rhinogram from '@/icons/rhinogram.svg'
import Slack from '@/icons/slack.svg'
import { css } from '@css/css'

export const metadata: Metadata = {
  title: 'Experience',
}

export default function Experience() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>Experience</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <List>
          <ListItem
            label="Slack"
            meta="Staff software engineer :: 05/2021 - current"
            icon={<Slack />}
          >
            I&apos;m part of the design infrastructure team, building tools to
            help designers and engineers collaborate more efficiently. My
            focuses include design systems, build tooling, and developer
            experience.
          </ListItem>
          <ListItem
            label="Gremlin"
            meta="Senior software engineer :: 09/2018 - 05/2021"
            icon={<Gremlin />}
          >
            Revamped their marketing platform, alongside creating a
            component-library used throughout their ecosystem. Lead technical
            conversations for new feature initiatives and increased efficiency
            for both content and developer contributions across the company.
          </ListItem>
          <ListItem
            label="Rhinogram"
            meta="Senior UI Engineer :: 01/2017 - 08/2018"
            icon={<Rhinogram />}
          >
            Managed a React-powered styleguide that in-turn was integrated into
            the flagship application that helps both physicians and patients
            communicate more effectively.
          </ListItem>
          <ListItem
            label="DigitalOcean"
            meta="UI Engineer :: 01/2016 - 01/2017"
            icon={<DigitalOcean />}
          >
            Lead development efforts on creating an internal framework used to
            power the main website and ongoing brand initiatives. Implemented
            style guides for saner development workflows. Worked alongside a
            talented group dedicated to accessibility and performance.
          </ListItem>
        </List>

        <div
          className={css({
            marginInlineStart: '1',
            marginBlockStart: '12',
            fontSize: 'xl',
            width: 'fit',
          })}
        >
          <LinkedIn />
        </div>
      </MotionMain>
    </>
  )
}
