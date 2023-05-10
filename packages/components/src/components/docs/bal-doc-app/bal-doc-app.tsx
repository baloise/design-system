import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core'
import * as balIcons from '@baloise/design-system-icons'
import { updateBalIcons } from '../../../utils/config'
import { balBrowser } from '../../../utils/browser'
import { BalLogger } from '../../../utils/log'
import globalScript from '../../../global'

@Component({
  tag: 'bal-doc-app',
  styleUrl: 'bal-doc-app.sass',
})
export class DocApp implements ComponentInterface {
  @Prop() logComponents = ''
  @Prop() logLifecycle = true
  @Prop() logEvents = true
  @Prop() logRender = true
  @Prop() logCustom = true

  /**
   * Disables all animation inside the bal-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) animated = true

  connectedCallback() {
    globalScript()
    updateBalIcons(balIcons)
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
    if (balBrowser.hasWindow) {
      ;(window as any).BaloiseDesignSystem.config.logger = logConfig
    }
  }

  render() {
    return (
      <Host>
        <bal-app animated={this.animated}>
          <slot></slot>
        </bal-app>
      </Host>
    )
  }
}
