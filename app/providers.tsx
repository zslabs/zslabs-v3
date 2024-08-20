'use client'

import { MotionConfig } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

import { spring } from '~helpers/styles'

export default function Providers({ children }: { children: React.ReactNode }) {
  let router = useRouter()

  return (
    <MotionConfig transition={spring}>
      <RouterProvider navigate={router.push}>{children}</RouterProvider>
    </MotionConfig>
  )
}
