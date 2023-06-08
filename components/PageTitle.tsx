interface PageTitleProps {
  children: React.ReactNode
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <h3 className="mb-8 text-3xl font-medium font-heading tracking-normal">
      {children}
    </h3>
  )
}

export default PageTitle
