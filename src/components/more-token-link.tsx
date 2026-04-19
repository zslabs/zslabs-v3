import { css } from '@css/css'

import { ButtonLink } from '@/components/button'
import Token from '@/icons/token.svg?react'

export default function MoreTokenLink() {
  return (
    <ButtonLink variation="default" to="/token">
      <Token />
      <span
        className={css({
          textStyle: 'mono',
        })}
      >
        token()
      </span>{' '}
      articles
    </ButtonLink>
  )
}
