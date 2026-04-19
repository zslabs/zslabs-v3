import { ButtonLink } from '@/components/button'
import Tooltip from '@/components/tooltip'
import More from '@/icons/more.svg?react'

export default function MoreArticlesLink() {
  return (
    <Tooltip content="More articles">
      <ButtonLink iconOnly to="/articles" title="More articles">
        <More />
      </ButtonLink>
    </Tooltip>
  )
}
