import * as React from 'react'

import { motion } from 'framer-motion'

interface ProseProps {
  children: React.ReactNode
}

const Prose = ({ children, ...rest }: ProseProps) => {
  return (
    <motion.div {...rest} className="prose text-slate-11">
      {children}
    </motion.div>
  )
}

export default Prose
