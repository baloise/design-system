import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface, globalScript } from '@global'
import { dsBrowser, DsLogger } from '@utils'
// import { Icons } from '@baloise/ds-assets'
// import { DsIcons, updateDsIcons } from '@global'

/**
 * @internal
 */
@Component({
  tag: 'ds-doc-app',
  styleUrl: 'doc-app.scss',
})
export class DocApp {
  @Element() el!: HTMLStencilElement

  @Prop() readonly logComponents: string = ''
  @Prop() readonly logLifecycle: boolean = true
  @Prop() readonly logEvents: boolean = true
  @Prop() readonly logRender: boolean = true
  @Prop() readonly logCustom: boolean = true
  @Prop() readonly stickyFooter: boolean = false
  @Prop() readonly region?: string // = 'CH'
  @Prop() readonly language?: string // = 'de'

  /**
   * Disables all animation inside the ds-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) readonly animated: boolean = true

  connectedCallback() {
    globalScript()
    // updateDsIcons(Icons as any as DsIcons)
  }

  componentDidRender() {
    const logConfig: DsLogger = {
      components: this.logComponents
        .split(',')
        .map(c => c.trim())
        .filter(c => c !== ''),
      lifecycle: this.logLifecycle,
      event: this.logEvents,
      render: this.logRender,
      custom: this.logCustom,
    }
    if (dsBrowser.hasWindow) {
      if (this.logComponents) {
        ;(window as any).DesignSystem.config.logger = logConfig
      }
      if (this.region) {
        ;(window as any).DesignSystem.config.region = this.region
      }
      if (this.language) {
        ;(window as any).DesignSystem.config.language = this.language
      }
    }
  }

  render() {
    return (
      <Host>
        <ds-app animated={this.animated}>
          <div class={{ 'has-sticky-footer': this.stickyFooter }}>
            <slot></slot>
          </div>
        </ds-app>
      </Host>
    )
  }
}
