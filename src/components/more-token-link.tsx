import { css } from '@css/css'

import { Button } from '@/components/button'
import TextLink from '@/components/text-link'
import Token from '@/icons/token.svg?react'

export default function MoreTokenLink() {
  return (
    <TextLink to="/token">
      <Button variation="default" render={(props) => <span {...props} />}>
        <Token />
        <span
          className={css({
            textStyle: 'mono',
          })}
        >
          token()
        </span>{' '}
        articles
      </Button>
    </TextLink>
  )
}
