import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { logoAngular, logoHtml, logoReact, logoStackblitz } from './stackblitz.logos'
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

  @Prop() fullscreen = false
  @Prop() framework!: Frameworks
  @Prop() modules!: string
  @Prop() template!: string
  @Prop() component!: string

  @Prop() name2!: string
  @Prop() template2!: string
  @Prop() component2!: string

  @Prop() visible = false
  @Prop() primary = false
  @Prop() logo = false
  @Prop() label!: string

  openProject = async (framework: Frameworks) => {
    if (framework === 'angular') {
      openAngularProject({
        template: this.template,
        component: this.component,
        modules: this.modules,
        name2: this.name2,
        template2: this.template2,
        component2: this.component2,
        fullscreen: this.fullscreen,
      })
    }

    if (framework === 'react') {
      openReactProject({
        component: this.component,
        fullscreen: this.fullscreen,
      })
    }

    if (framework === 'html') {
      openHtmlProject({
        template: this.template,
        component: this.component,
        fullscreen: this.fullscreen,
      })
    }
  }

  render() {
    const framework = getFramework()

    if (framework !== this.framework && !this.visible) {
      return <Host style={{ display: 'none' }}></Host>
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
            <bal-button color={this.primary ? 'primary' : 'info'} onClick={() => this.openProject(this.framework)}>
              <div class="is-flex fg-xx-small">
                <div innerHTML={this.logo ? logoStackblitz : logo} style={{ width: '24px', height: '24px' }}></div>
                <span>{this.label ? this.label : `${labels[this.framework] || 'Angular'} StackBlitz`}</span>
              </div>
            </bal-button>
          </bal-button-group>
        </bal-doc-app>
      </Host>
    )
  }
}
