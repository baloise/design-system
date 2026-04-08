import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import globalScript from '../../../global'
import { dsBrowser } from '../../../utils/browser'
import { Logger } from '../../../utils/log'
// import { Icons } from '@baloise/ds-assets'
import { Icons, updateBalIcons } from '../../../utils/config'

/**
 * @internal
 */
@Component({
  tag: 'bal-doc-app',
  styleUrl: 'doc-app.scss',
})
export class DocApp implements ComponentInterface {
  @Prop() logComponents = ''
  @Prop() logLifecycle = true
  @Prop() logEvents = true
  @Prop() logRender = true
  @Prop() logCustom = true
  @Prop() stickyFooter = false
  @Prop() region?: string // = 'CH'
  @Prop() language?: string // = 'de'

  /**
   * Disables all animation inside the bal-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) animated = true

  connectedCallback() {
    globalScript()
    // updateBalIcons(Icons as any as BalIcons)
  }

  componentDidRender() {
    const logConfig: BalLogger = {
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
        ;(window as any).BaloiseDesignSystem.config.logger = logConfig
      }
      if (this.region) {
        ;(window as any).BaloiseDesignSystem.config.region = this.region
      }
      if (this.language) {
        ;(window as any).BaloiseDesignSystem.config.language = this.language
      }
    }
  }

  render() {
    return (
      <Host>
        <bal-app animated={this.animated}>
          <div class={{ 'has-sticky-footer': this.stickyFooter }}>
            <slot></slot>
          </div>
        </bal-app>
      </Host>
    )
  }
}
