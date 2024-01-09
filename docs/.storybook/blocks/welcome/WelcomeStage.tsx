import React from 'react'
import { CodeSandbox } from '../CodeSandbox'
import { navigate } from '@storybook/addon-links'

export const WelcomeStage = ({ children }) => {
  return (
    <div className="sb-unstyled my-welcome-state has-background-purple">
      <div>
        <div className="mt-small">
          <bal-logo animated={true}></bal-logo>
        </div>
        <h1 className="subtitle text-xx-large mt-x-small">Design System</h1>
        <p className="text-medium my-large">
          The Baloise Design System consists of UI components and a clearly defined visual style, released as both code
          implementations and design artifacts to build any number of web applications.
        </p>
        <div>
          <div className="is-flex fg-normal is-flex-wrap-wrap">
            <CodeSandbox />
            <a
              className="button is-info"
              style={{ width: 'auto' }}
              onClick={() => navigate({ title: 'Development/Getting Started' })}
            >
              Getting Started
            </a>
            <bal-button color="info" icon="github" href="https://github.com/baloise/design-system" target="_blank">
              Follow on GitHub
            </bal-button>
          </div>
        </div>
      </div>
      <div className="my-welcome-state-shape">
        <div>
          <bal-shape color="purple"></bal-shape>
        </div>
      </div>
    </div>
  )
}
