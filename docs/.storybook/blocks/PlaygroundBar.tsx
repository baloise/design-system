import React from 'react'
import { Unstyled, useOf } from '@storybook/blocks'
import { navigate } from '@storybook/addon-links'
import { CodeSandbox } from './CodeSandbox'

export const PlaygroundBar = ({ of, children }) => {
  const resolvedOf = useOf(of || 'story', ['story'])

  return (
    <Unstyled>
      <div className="is-flex fg-normal is-justify-content-center">
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
      </div>
    </Unstyled>
  )
}
