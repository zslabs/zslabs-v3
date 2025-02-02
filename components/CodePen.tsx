/**
 * @SOURCE https://github.com/PaulieScanlon/mdx-embed/blob/main/packages/mdx-embed/src/components/codepen/codepen.tsx
 * MIT License
 * Copyright (c) 2020 Paul Scanlon
 */

import React from 'react'

import GeneralObserver from '@/components/GeneralObserver'
import { css } from '@css/css'

export interface ICodePenProps {
  /** CodePen id */
  codePenId: string
  /** Height for the iFrame */
  height?: number
  /** Which tabs to display */
  tabs?: string[] | 'js' | 'css' | 'scss' | 'less' | 'result'
  /** Load pen in a preview state? * */
  clickToLoad?: boolean
  /** Make the CodePen editable * */
  editable?: boolean
  /** Theme of the CodePen * */
  theme?: string | 'light' | 'dark' | 'default'
}

export default function CodePen({
  codePenId,
  height = 500,
  tabs = 'result',
  clickToLoad = false,
  editable = false,
  theme = 'default',
  ...rest
}: ICodePenProps & React.HTMLAttributes<HTMLIFrameElement>) {
  return (
    <GeneralObserver height={height}>
      <iframe
        {...rest}
        data-testid="codepen"
        title={`codepen-${codePenId}`}
        height={height}
        className={css({
          width: 'full',
        })}
        src={`https://codepen.io/team/codepen/embed${
          clickToLoad ? '/preview' : ''
        }/${codePenId}?height=265&theme-id=${theme}&default-tab=${tabs}${
          editable ? '&editable=true' : ''
        }`}
      />
    </GeneralObserver>
  )
}
