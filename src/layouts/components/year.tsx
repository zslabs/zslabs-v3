export default function Year() {
  const date = new Date()
  const year = date.getFullYear()

  return <span suppressHydrationWarning>{year}</span>
}
