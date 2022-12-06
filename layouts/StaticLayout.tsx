import * as React from 'react'

import type { ChildrenOnlyProps } from '~types/custom'

const StaticLayout: React.FC<ChildrenOnlyProps> = ({ children }) => {
  return (
    <>
      {children}

      <div className="pointer-events-none relative isolate -z-1 opacity-30">
        <div className="fixed inset-0 mix-blend-color-dodge nnnoise" />
        <div className="fixed inset-0 bg-center mix-blend-color-dodge ooorganize" />
      </div>
    </>
  )
}

export default StaticLayout
