
import React from 'react';

export const WelcomeStage = ({children}) => {
  return <div className='my-welcome-state sb-unstyled'>
    <bal-stage color="red" shape size="small">
      <bal-stage-body>
        <bal-logo color="primary" animated></bal-logo>
        <h1 className='subtitle has-color-primary mt-medium'>design system</h1>
        <bal-text size="lead" class="mt-medium">
          The Baloise Design System consists of UI components and a clearly defined visual style, released
          as both code implementations and design artifacts to build any number of web applications.
        </bal-text>
        <bal-button-group class="mt-medium">
          <bal-doc-code-sandbox framework="html" label="Try Online" logo primary></bal-doc-code-sandbox>
          <bal-doc-code-sandbox framework="angular" label="Try Online" logo primary></bal-doc-code-sandbox>
          <bal-doc-code-sandbox framework="react" label="Try Online" logo primary></bal-doc-code-sandbox>
          <a
            className="button is-info"
            style={{ width: 'auto' }}
            href="?path=/docs/development-getting-started--page"
          >
            Getting Started
          </a>
          <bal-button
            color="info"
            icon="github"
            href="https://github.com/baloise/design-system"
            target="_blank"
          >
            Follow on GitHub
          </bal-button>
        </bal-button-group>
      </bal-stage-body>
    </bal-stage>
  </div>
};

