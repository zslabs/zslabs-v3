/**
 * @SOURCE https://github.com/PaulieScanlon/mdx-embed/blob/main/packages/mdx-embed/src/components/general-observer/general-observer.tsx
 * MIT License
 * Copyright (c) 2020 Paul Scanlon
 */
import React from 'react'

import { css } from '@css/css'

import type { ChildrenOnlyProps } from '@/types/custom'

interface IGeneralObserverProps extends ChildrenOnlyProps {
  /** Fires when IntersectionObserver enters viewport */
  onEnter?: (id?: string) => void
  /** The height of the placeholder div before the component renders in */
  height?: number
}

export default function GeneralObserver({
  children,

  onEnter,
  height = 0,
}: IGeneralObserverProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const onEnterRef = React.useRef(onEnter)
  const [isChildVisible, setIsChildVisible] = React.useState(false)

  React.useEffect(() => {
    onEnterRef.current = onEnter
  }, [onEnter])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setIsChildVisible(true)
          onEnterRef.current?.()
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '400px',
        threshold: 0,
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const style: React.CSSProperties = { height, width: '100%' }

  return (
    <div
      ref={ref}
      data-testid="general-observer"
      className={css({
        marginBlock: '8',
      })}
    >
      {isChildVisible ? children : <div style={style} />}
    </div>
  )
}
