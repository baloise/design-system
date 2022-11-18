import { Component, Host, h, Prop } from '@stencil/core'
import { isWindowDefined } from '../../../utils/browser'
import { BalLogger } from '../../../utils/log'

@Component({
  tag: 'bal-doc-app',
  styleUrl: '../../../styles/global.sass',
})
export class DocApp {
  @Prop() logComponents = ''
  @Prop() logLifecycle = false
  @Prop() logEvents = false
  @Prop() logRender = false
  @Prop() logCustom = false

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
    if (isWindowDefined()) {
      ;(window as any).BaloiseDesignSystem.config.logger = logConfig
    }
  }

  render() {
    return (
      <Host>
        <bal-app>
          <slot></slot>
        </bal-app>
      </Host>
    )
  }
}
