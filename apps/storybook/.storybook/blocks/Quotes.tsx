import { navigate } from '@storybook/addon-links'
import React, { PropsWithChildren } from 'react'
import { Code } from './Code'
import { AngularFramework } from './Framework'
import { Tabs } from './Tabs'

type InfoQuoteProps = PropsWithChildren

export const InfoQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-base bg-grey-1 border-left-primary text-sm text-primary my-md p-base radius-right">
      <ds-icon color="primary" name="information" style={{ marginTop: '2px' }}></ds-icon>
      <span>{children}</span>
    </div>
  )
}

export const WarningQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-base bg-warning-1 border-left-warning text-sm text-primary my-md p-base radius-right">
      <ds-icon color="warning" name="alert-triangle" style={{ marginTop: '2px' }}></ds-icon>
      <span>{children}</span>
    </div>
  )
}

type StylesQuoteProps = {
  tag: string
}

export const StylesQuote = ({ _tag }: StylesQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-base bg-grey-1 border-left-primary text-sm text-primary my-md p-base radius-right">
      <ds-icon color="primary" size="md" name="design" style={{ marginTop: '2px' }}></ds-icon>
      <div>
        <h3 className="ds-title">Styles import</h3>
        <span>
          Make sure the <b>@helvetia-design/styles</b> package is already present in your project or follow the{' '}
          <a className="ds-link" onClick={() => navigate({ title: 'Development/Styles' })}>
            installation guidelines
          </a>
          .
        </span>
        <Tabs
          tabs={[
            {
              label: 'CSS',
              content: (
                <>
                  <span className="block pt-lg">To import all Design System styles:</span>
                  <Code
                    language="css"
                    code={`
@import '@helvetia-design/styles/css/design-system.css';
`}
                  />
                </>
              ),
            },
            {
              label: 'Sass',
              content: (
                <>
                  <span className="block pt-lg">To import all Design System styles:</span>
                  <Code
                    language="css"
                    code={`
@use '@helvetia-design/styles/sass/design-system';
`}
                  />
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export const WebComponentQuote = ({ tag }: StylesQuoteProps): React.ReactElement => {
  function fromKebabToPascal(tag: string) {
    return tag
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
  }

  return (
    <div className="sb-unstyled flex gap-base bg-grey-1 border-left-primary text-sm text-primary my-md p-base radius-right">
      <ds-icon color="primary" size="md" name="info" style={{ marginTop: '2px' }}></ds-icon>
      <div>
        <h3 className="ds-title">Installation</h3>
        <span>
          Make sure the <b>@helvetia-design/core</b>, <b>@helvetia-design/angular</b> or <b>@helvetia-design/react</b>{' '}
          packages is already present in your project or follow the{' '}
          <a className="ds-link" onClick={() => navigate({ title: 'Development/Getting Started' })}>
            installation guidelines
          </a>
          .
          <br />
          <br />
          Styles are automatically included when using the web components.
          <AngularFramework>
            <Code
              language="ts"
              code={`
import { Component } from '@angular/core'
import { Ds${fromKebabToPascal(tag)} } from '@helvetia-design/angular'

@Component({
  selector: 'app-example',
  imports: [Ds${fromKebabToPascal(tag)}],
  template: \`<ds-${tag}></ds-${tag}>\`,
})
export class AppExampleComponent {}
`}
            />
          </AngularFramework>
        </span>
      </div>
    </div>
  )
}
