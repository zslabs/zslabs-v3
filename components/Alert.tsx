import * as React from 'react'

import ctl from '@netlify/classnames-template-literals'

interface AlertProps {
  variation?: 'primary' | 'danger'
}

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AlertProps
>(({ variation = 'primary', ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={ctl(`
        my-8 rounded-lg border-l-8 p-6

        ${variation === 'primary' && 'border-primary-9 bg-primary-3'}
        ${variation === 'danger' && 'border-danger-9 bg-danger-3'}
      `)}
    />
  )
})

export default Alert
