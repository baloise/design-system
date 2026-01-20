import { Canvas } from '@storybook/addon-docs/blocks'
import { navigate } from '@storybook/addon-links'
import React, { PropsWithChildren } from 'react'
import { ModuleExport } from 'storybook/internal/types'
import { Code } from './Code'
import { AngularFramework } from './Framework'
import { Tabs } from './Tabs'

type InfoQuoteProps = PropsWithChildren

export const InfoQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal">
      <bal-icon color="primary" name="info" style={{ marginTop: '2px' }}></bal-icon>
      <span>{children}</span>
    </div>
  )
}

export const WarningQuote = ({ children }: InfoQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-warning-1 border-left-warning text-small text-primary my-medium p-normal radius-right-normal">
      <bal-icon color="warning-dark" name="alert-triangle" style={{ marginTop: '2px' }}></bal-icon>
      <span>{children}</span>
    </div>
  )
}

type StylesQuoteProps = {
  tag: string
}

type BasicStoryTabsProps = {
  tag: string
  htmlStory: ModuleExport
  webComponentStory?: ModuleExport
}

export const BasicStoryTabs = ({ tag, htmlStory, webComponentStory }: BasicStoryTabsProps): React.ReactElement => {
  return (
    <Tabs
      tabs={[
        {
          label: 'HTML & CSS',
          content: (
            <>
              <Canvas of={htmlStory} sourceState="shown" />
              <StylesQuote tag={tag} />
            </>
          ),
        },
        {
          label: 'Web Component',
          content: (
            <>
              <Canvas of={webComponentStory} sourceState="shown" />
              <WebComponentQuote tag={tag} />
            </>
          ),
        },
      ]}
    />
  )
}

export const StylesQuote = ({ tag }: StylesQuoteProps): React.ReactElement => {
  return (
    <div className="sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal">
      <bal-icon color="primary" size="medium" name="design" style={{ marginTop: '2px' }}></bal-icon>
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
@import '@baloise/ds-styles/css/all.css';
`}
                  />
                  <span>To import only the styles required for this component:</span>
                  <Code
                    language="css"
                    code={`
@import '@baloise/ds-styles/css/basic.css';
@import '@baloise/ds-styles/css/components/bal-${tag}.css';
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
@use '@baloise/ds-styles/sass/all';
`}
                  />
                  <span>To import only the styles required for this component:</span>
                  <Code
                    language="css"
                    code={`
@use '@baloise/ds-styles/sass/basic';
@use '@baloise/ds-styles/css/components/bal-${tag}';
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
      <bal-icon color="primary" size="medium" name="info" style={{ marginTop: '2px' }}></bal-icon>
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
import { Bal${fromKebabToPascal(tag)} } from '@baloise/ds-angular'

@Component({
  selector: 'app-example',
  imports: [Bal${fromKebabToPascal(tag)}],
  template: \`<bal-${tag}></bal-${tag}>\`,
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
