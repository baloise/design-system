import React from 'react'
import { Unstyled } from '@storybook/addon-docs/blocks'

export const PlaygroundBar = ({ _of, _children }): React.ReactElement => {
  // const resolvedOf = useOf(of || 'story', ['story'])

  return (
    <Unstyled>
      {/* <div className="flex gap-normal justify-content-center">
        <a
          className="button"
          onClick={() => {
            navigate({ storyId: resolvedOf.story.id })
          }}
        >
          Go to playground
        </a>
        <CodeSandbox of={of} />
        {children}
      </div> */}
    </Unstyled>
  )
}
