import { useState } from 'react'

export default function Year() {
  const [year] = useState(() => new Date().getFullYear())

  return <span suppressHydrationWarning>{year}</span>
}
