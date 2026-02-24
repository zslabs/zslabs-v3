import { createContext, useCallback, useContext, useState } from 'react'

const LayoutAnimationContext = createContext<{
  done: boolean
  setDone: () => void
}>({ done: false, setDone: () => {} })

export function LayoutAnimationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [done, setDoneState] = useState(false)
  const setDone = useCallback(() => setDoneState(true), [])

  return (
    <LayoutAnimationContext.Provider value={{ done, setDone }}>
      {children}
    </LayoutAnimationContext.Provider>
  )
}

export function useLayoutAnimationDone() {
  return useContext(LayoutAnimationContext).done
}

export function useLayoutAnimationSetDone() {
  return useContext(LayoutAnimationContext).setDone
}
