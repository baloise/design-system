import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { logoAngular, logoHtml, logoReact } from './stackblitz.logos'
import { Frameworks, getFramework } from './stackblitz.util'
import { openAngularProject } from './stackblitz.angular'
import { openReactProject } from './stackblitz.react'
import { openHtmlProject } from './stackblitz.html'

@Component({
  tag: 'bal-doc-stackblitz',
  styleUrl: 'bal-doc-stackblitz.sass',
})
export class DocStackblitz implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() framework!: Frameworks
  @Prop() modules!: string
  @Prop() template!: string
  @Prop() component!: string

  @Prop() name2!: string
  @Prop() template2!: string
  @Prop() component2!: string

  openProject = async (framework: Frameworks) => {
    if (framework === 'angular') {
      openAngularProject({
        template: this.template,
        component: this.component,
        modules: this.modules,
        name2: this.name2,
        template2: this.template2,
        component2: this.component2,
      })
    }

    if (framework === 'react') {
      openReactProject({
        component: this.component,
      })
    }

    if (framework === 'html') {
      openHtmlProject({
        template: this.template,
        component: this.component,
      })
    }
  }

  render() {
    const framework = getFramework()

    if (framework !== this.framework) {
      return ''
    }

    const labels = {
      angular: 'Angular',
      html: 'HTML & JS',
      react: 'React',
      vue: 'Vue.js',
    }

    const logos = {
      angular: logoAngular,
      react: logoReact,
      html: logoHtml,
      vue: logoReact,
    }

    const logo = logos[this.framework]

    return (
      <Host
        class={{
          'bal-doc-stackblitz': true,
          [`bal-doc-stackblitz--${this.framework}`]: true,
        }}
      >
        <bal-doc-app>
          <bal-button-group>
            <bal-button color="info" onClick={() => this.openProject(framework)}>
              <div class="is-flex fg-xx-small">
                <div innerHTML={logo} style={{ width: '24px', height: '24px' }}></div>
                <span>{labels[framework] || 'Angular'} Example</span>
              </div>
            </bal-button>
          </bal-button-group>
        </bal-doc-app>
      </Host>
    )
  }
}
