import * as React from 'react'

import { motion } from 'framer-motion'

import Icon from './Icon'
import Prose from './Prose'
import TextLink from './TextLink'

import { fadeInUp, viewportInViewOptions } from '~helpers/styles'
import type { IconName } from '~icons/build/types'

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-1 gap-6">{children}</ul>
}

export function ListItem({
  label,
  children,
  href,
  meta,
  icon,
}: {
  label: React.ReactNode
  meta?: string
  children?: React.ReactNode
  href?: string
  icon?: IconName
}) {
  return (
    <motion.li
      className="flex gap-4"
      initial="offscreen"
      whileInView="onscreen"
      variants={fadeInUp}
      viewport={viewportInViewOptions}
    >
      {icon && (
        <div className="relative self-start rounded-full bg-overlay-8 p-1 text-xl">
          <Icon name={icon} />
        </div>
      )}
      <div>
        <div className="mb-1">
          {href ? (
            <TextLink
              className="group flex w-fit items-baseline gap-1"
              href={href}
            >
              <span className="underline decoration-dotted underline-offset-4 transition-all group-hocus:underline-offset-5">
                {label}
              </span>
              {!href?.startsWith('/') && (
                <div className="rotate-[-135deg] text-lg leading-none text-slate-11">
                  <Icon name="arrow-down" inline />
                </div>
              )}
            </TextLink>
          ) : (
            <span>{label}</span>
          )}
        </div>
        <div>
          {children && <Prose>{children}</Prose>}
          {meta && (
            <div className="mt-2 font-mono text-sm uppercase text-slate-12">
              {meta}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}
