import { Component, ComponentInterface, Host, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-link-grid',
  styleUrl: 'bal-nav-link-grid.sass',
})
export class NavLinkGrid implements ComponentInterface, Loggable {
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
        }}
      >
        <slot />
      </Host>
    )
  }
}
