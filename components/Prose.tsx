interface ProseProps {
  children: React.ReactNode
}

const Prose = ({ children, ...rest }: ProseProps) => {
  return (
    <div {...rest} className="prose text-slate-11">
      {children}
    </div>
  )
}

export default Prose
