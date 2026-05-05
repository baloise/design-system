import { navigate } from '@storybook/addon-links'
import React, { PropsWithChildren } from 'react'
import { Code } from './Code'
import { AngularFramework } from './Framework'
import { Tabs } from './Tabs'

type InfoQuoteProps = PropsWithChildren

export const InfoQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal">
      <ds-icon color="primary" name="information" style={{ marginTop: '2px' }}></ds-icon>
      <span>{children}</span>
    </div>
  )
}

export const WarningQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-warning-1 border-left-warning text-small text-primary my-medium p-normal radius-right-normal">
      <ds-icon color="warning-dark" name="alert-triangle" style={{ marginTop: '2px' }}></ds-icon>
      <span>{children}</span>
    </div>
  )
}

type StylesQuoteProps = {
  tag: string
}

export const StylesQuote = ({ tag }: StylesQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal">
      <ds-icon color="primary" size="medium" name="design" style={{ marginTop: '2px' }}></ds-icon>
      <div>
        <h3 className="title">Styles import</h3>
        <span>
          Make sure the <b>@baloise/ds-styles</b> package is already present in your project or follow the{' '}
          <a className="link" onClick={() => navigate({ title: 'Development/Styles' })}>
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
                  <span className="block pt-large">To import all Design System styles:</span>
                  <Code
                    language="css"
                    code={`
@import '@baloise/ds-styles/css/design-system.css';
`}
                  />
                </>
              ),
            },
            {
              label: 'Sass',
              content: (
                <>
                  <span className="block pt-large">To import all Design System styles:</span>
                  <Code
                    language="css"
                    code={`
@use '@baloise/ds-styles/sass/design-system';
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
    <div className="sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal">
      <ds-icon color="primary" size="medium" name="info" style={{ marginTop: '2px' }}></ds-icon>
      <div>
        <h3 className="title">Installation</h3>
        <span>
          Make sure the <b>@baloise/ds-core</b>, <b>@baloise/ds-angular</b> or <b>@baloise/ds-react</b> packages is
          already present in your project or follow the{' '}
          <a className="link" onClick={() => navigate({ title: 'Development/Getting Started' })}>
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
import { Ds${fromKebabToPascal(tag)} } from '@baloise/ds-angular'

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
