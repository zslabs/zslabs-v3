'use client'

import * as React from 'react'

import { motion } from 'framer-motion'

import Icon from './Icon'
import Prose from './Prose'

import TextLink from '~components/TextLink'
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
                <div className="rotate-[-135deg] text-lg leading-none text-slate-11 transition-transform duration-200 ease-in-out will-change-transform group-hocus:translate-x-0.5 group-hocus:translate-y-[0.075rem] group-hocus:rotate-[-90deg]">
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
            <div className="relative mt-2 w-fit px-2 py-1 font-mono text-sm uppercase leading-none text-slate-12 before:absolute before:inset-0 before:-z-1 before:skew-x-12 before:rounded-sm before:bg-overlay-contrast-5 before:opacity-25">
              {meta}
            </div>
          )}
        </div>
      </div>
    </motion.li>
  )
}
