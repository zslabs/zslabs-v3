import { Button } from '@/components/button'
import TextLink from '@/components/text-link'
import Tooltip from '@/components/tooltip'
import More from '@/icons/more.svg?react'

export default function MoreArticlesLink() {
  return (
    <Tooltip content="More articles">
      <TextLink to="/articles" title="More articles">
        <Button iconOnly render={(props) => <span {...props} />}>
          <More />
        </Button>
      </TextLink>
    </Tooltip>
  )
}
