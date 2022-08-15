import * as React from 'react'

import { Command } from 'cmdk'
import { useRouter } from 'next/router'

import Icon from './Icon'

import useCommandSearchState from '~hooks/useCommandSearchState'
import type { IconName } from '~icons/build/types'

const Group = ({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) => {
  return (
    <Command.Group
      heading={heading}
      className="select-none p-2 text-sm text-slate-11"
    >
      {children}
    </Command.Group>
  )
}

const Item = ({
  children,
  href,
  meta,
  icon,
}: {
  children: React.ReactNode
  href: string
  meta?: string | undefined
  icon?: IconName
}) => {
  const router = useRouter()
  const toggle = useCommandSearchState((state) => state.toggle)

  const handleItemSelect = React.useCallback(() => {
    toggle()
    router.push(href)
  }, [href, router, toggle])

  return (
    <Command.Item
      className="-mx-2 mt-1 flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-slate-12 first:mt-2 aria-selected:bg-slate-3"
      onSelect={handleItemSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <Icon name={icon} />}
          <span>{children}</span>
        </div>
        {meta && <span className="text-slate-11">{meta}</span>}
      </div>
    </Command.Item>
  )
}

const CommandMenu = () => {
  const open = useCommandSearchState((state) => state.open)
  const toggle = useCommandSearchState((state) => state.toggle)

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        toggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggle])

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={toggle}
        label="Global Command Menu"
        className="fixed inset-0 z-50 overflow-auto bg-overlay-11 px-2"
      >
        <div className="mx-auto my-4 max-w-[65ch] rounded-xl border border-slate-7 bg-slate-1 shadow-lg md:my-8">
          <Command.Input
            placeholder="Search..."
            className="h-12 w-full border-b border-b-slate-7 bg-transparent px-4 focus:outline-none"
          />
          <Command.List className="px-2">
            <Command.Empty className="py-2 text-sm text-slate-11">
              No results found
            </Command.Empty>

            <Group heading="Articles">
              <Item href="/articles/rebuilding-list">a</Item>
            </Group>
            <Group heading="Pages">
              <Item href="/terms">Terms</Item>
              <Item href="/privacy">Privacy</Item>
            </Group>
            <Group heading="Social">
              <Item icon="twitter" href="https://twitter.com/zslabs">
                Twitter
              </Item>
              <Item icon="github" href="https://github.com/zslabs">
                GitHub
              </Item>
            </Group>
          </Command.List>
          <div className="mt-4 flex items-center justify-end gap-1 py-2 px-4 text-sm text-slate-11">
            <span>Select</span>
            <kbd>↵</kbd>
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}

export default CommandMenu
