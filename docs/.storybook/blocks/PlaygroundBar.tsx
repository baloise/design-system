import React from 'react'
import { Unstyled, useOf } from '@storybook/blocks'
import { navigate } from '@storybook/addon-links'

export const PlaygroundBar = ({ of, children }) => {
  const resolvedOf = useOf(of || 'story', ['story'])

  return (
    <Unstyled>
      <div className="flex gap-normal justify-content-center">
        <a
          className="button"
          onClick={() => {
            navigate({ storyId: resolvedOf.story.id })
          }}
        >
          Go to playground
        </a>
        {children}
      </div>
    </Unstyled>
  )
}
