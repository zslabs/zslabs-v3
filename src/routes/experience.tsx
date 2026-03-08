import { css } from '@css/css'
import { createFileRoute } from '@tanstack/react-router'

import { MotionHeader, MotionMain } from '@/components/content-wrappers'
import LinkedIn from '@/components/linked-in'
import { List, ListItem } from '@/components/list'
import SectionTitle from '@/components/section-title'
import DigitalOcean from '@/icons/digitalocean.svg?react'
import Gremlin from '@/icons/gremlin.svg?react'
import Rhinogram from '@/icons/rhinogram.svg?react'
import Slack from '@/icons/slack.svg?react'

export const Route = createFileRoute('/experience')({
  head: () => ({
    meta: [{ title: 'Experience | Zach Schnackel' }],
  }),
  component: Experience,
})

function Experience() {
  return (
    <>
      <MotionHeader>
        <SectionTitle>Experience</SectionTitle>
      </MotionHeader>
      <MotionMain>
        <List>
          <ListItem
            label="Slack"
            meta={['Staff software engineer', '05/21 - current']}
            icon={<Slack />}
          >
            I&apos;m part of the design infrastructure team, building tools to
            help designers and engineers collaborate more efficiently. My
            focuses include design systems, build tooling, and developer
            experience.
          </ListItem>
          <ListItem
            label="Gremlin"
            meta={['Senior software engineer', '09/18 - 05/21']}
            icon={<Gremlin />}
          >
            Revamped their marketing platform, alongside creating a
            component-library used throughout their ecosystem. Lead technical
            conversations for new feature initiatives and increased efficiency
            for both content and developer contributions across the company.
          </ListItem>
          <ListItem
            label="Rhinogram"
            meta={['Senior UI Engineer', '01/17 - 08/18']}
            icon={<Rhinogram />}
          >
            Managed a React-powered styleguide that in-turn was integrated into
            the flagship application that helps both physicians and patients
            communicate more effectively.
          </ListItem>
          <ListItem
            label="DigitalOcean"
            meta={['UI Engineer', '01/16 - 01/17']}
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
