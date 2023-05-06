interface SectionTitleProps {
  children: React.ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return <h3 className="mb-8 text-xl font-medium">{children}</h3>
}

export default SectionTitle
