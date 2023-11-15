import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-nav-link-grid',
  styleUrl: 'bal-nav-link-grid.sass',
})
export class NavigationLinkGrid implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-nav-link-grid')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link-grid')

    return (
      <Host
        class={{
          ...block.class(),
          'columns is-multiline': true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
