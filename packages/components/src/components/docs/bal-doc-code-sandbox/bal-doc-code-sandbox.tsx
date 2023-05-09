import { Component, h, ComponentInterface, Host, Element, Prop, State, Watch } from '@stencil/core'
import { logoAngular, logoCodeSandbox, logoHtml, logoReact } from './code-sandbox.logos'
import { Frameworks, getFramework } from './code-sandbox.util'
import { buildHtmlParameters } from './code-sandbox.html'
import { buildReactParameters } from './code-sandbox.react'
import { buildAngularParameters } from './code-sandbox.angular'

@Component({
  tag: 'bal-doc-code-sandbox',
  styleUrl: 'bal-doc-code-sandbox.sass',
})
export class DocCodeSandbox implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() fullscreen = false

  @Prop() framework!: Frameworks
  @Watch('framework')
  frameworkWatcher() {
    this.buildParameters()
  }

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

  @State() parameters = ''

  componentWillLoad() {
    this.buildParameters()
  }

  private buildParameters = async () => {
    if (this.framework === 'html') {
      this.parameters = await buildHtmlParameters({
        template: this.template,
        component: this.component,
        fullscreen: this.fullscreen,
      })
    }

    if (this.framework === 'react') {
      this.parameters = await buildReactParameters({
        component: this.component,
        fullscreen: this.fullscreen,
      })
    }

    if (this.framework === 'angular') {
      this.parameters = await buildAngularParameters({
        template: this.template,
        component: this.component,
        name2: this.name2,
        template2: this.template2,
        component2: this.component2,
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
          'bal-doc-code-sandbox': true,
          [`bal-doc-code-sandbox--${this.framework}`]: true,
        }}
      >
        <bal-doc-app>
          <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
            <input type="hidden" name="parameters" value={this.parameters} />
            <bal-button elementType={'submit'}>
              <div class="is-flex fg-xx-small">
                <div innerHTML={this.logo ? logoCodeSandbox : logo} style={{ width: '24px', height: '24px' }}></div>
                <span>{this.label ? this.label : `${labels[this.framework] || 'Angular'} Code Sandbox`}</span>
              </div>
            </bal-button>
          </form>
        </bal-doc-app>
      </Host>
    )
  }
}
