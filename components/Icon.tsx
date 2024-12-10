import * as React from 'react'

import manifest from '~icons/build/manifest.json'
import type { IconName } from '~icons/build/types'

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  name: IconName
  /** Useful when we need to use an icon within a sentence */
  inline?: boolean
  /** We forbid use of the `className` prop in order to avoid contamination of the source-of-truth. Please don't style icons directly (even in CSS). Use their parent selector to modify size, color, position, etc */
  className?: never
}

/** Normalize value for dimension calculations */
function scaleWidth(width = 24, height = 24) {
  return +(width / height).toFixed(3)
}

const data = {
  [`data-${manifest.prefix}`]: true,
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, inline, ...rest }, forwardedRef) => {
    // Base hash for style

    // Get the icon from the manifest
    const icon = manifest.icons[name] as {
      body: string
      width?: number
      height?: number
    }

    const body = { __html: icon.body }
    const viewBox = `0 0 ${icon.width || 24} ${icon.height || 24}`

    const style = {
      width:
        icon.width || icon.height
          ? `${scaleWidth(icon.width, icon.height)}em`
          : undefined,
    } as React.CSSProperties

    return (
      <svg
        role="img"
        ref={forwardedRef}
        viewBox={viewBox}
        {...data}
        {...(inline && { className: 'is-inline' })}
        dangerouslySetInnerHTML={body}
        style={style}
        aria-hidden="true"
        {...rest}
      />
    )
  }
)

Icon.displayName = 'Icon'

export default Icon
