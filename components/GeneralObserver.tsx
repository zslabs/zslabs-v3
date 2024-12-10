'use client'

/**
 * @SOURCE https://github.com/PaulieScanlon/mdx-embed/blob/main/packages/mdx-embed/src/components/general-observer/general-observer.tsx
 * MIT License
 * Copyright (c) 2020 Paul Scanlon
 */
import React from 'react'

import { css } from '~css/css'
import type { ChildrenOnlyProps } from '~types/custom'

interface IGeneralObserverProps extends ChildrenOnlyProps {
  /** Fires when IntersectionObserver enters viewport */
  onEnter?: (id?: string) => void
  /** The height of the placeholder div before the component renders in */
  height?: number
}

export default function GeneralObserver({
  children,

  onEnter = () => {},
  height = 0,
}: IGeneralObserverProps) {
  const ref = React.useRef<HTMLElement>(null)
  const [isChildVisible, setIsChildVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setIsChildVisible(true)

          onEnter()
        }
      },
      {
        root: null,
        rootMargin: '400px',
        threshold: 0,
      }
    )

    if (ref && ref.current) {
      observer.observe(ref.current)
    }
  }, [ref, onEnter])

  const style: React.CSSProperties = { height, width: '100%' }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-testid="general-observer"
      className={css({
        marginBlock: '8',
      })}
    >
      {isChildVisible ? children : <div style={style} />}
    </div>
  )
}
