'use client'

/**
 * @SOURCE https://github.com/PaulieScanlon/mdx-embed/blob/main/packages/mdx-embed/src/components/twitter/tweet.tsx
 * MIT License
 * Copyright (c) 2020 Paul Scanlon
 */
import React from 'react'

import GeneralObserver from '~components/GeneralObserver'
import useScript from '~hooks/useScript'

declare const window: {
  twttr: unknown
} & Window

export interface ITweetProps {
  /** Tweet link */
  tweetLink: string
  /** Color theme of the Tweet */
  theme?: 'light' | 'dark'
  /** Alignment of the Tweet */
  align?: 'left' | 'center' | 'right'
  /** Hides the conversation */
  hideConversation?: boolean
}

export default function Tweet({
  tweetLink,
  theme = 'light',
  align = 'left',
  hideConversation = false,
}: ITweetProps) {
  useScript('https://platform.twitter.com/widgets.js')

  return (
    <GeneralObserver>
      <div data-testid="twitter-tweet" className="overflow-auto">
        <blockquote
          data-theme={theme}
          data-align={align}
          data-conversation={hideConversation ? 'none' : ''}
        >
          <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>
            {typeof window !== 'undefined' && window?.twttr ? 'Loading' : ''}
          </a>
        </blockquote>
      </div>
    </GeneralObserver>
  )
}
