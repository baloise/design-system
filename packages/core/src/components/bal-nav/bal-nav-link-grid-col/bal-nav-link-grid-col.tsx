import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-link-grid-col',
  styleUrl: 'bal-nav-link-grid-col.scss',
})
export class NavLinkGridCol implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-nav-link-grid-col')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the static column which is always aligned to the right
   */
  @Prop() staticCol: BalProps.BalNavLinkGridCol = false

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link-grid-col')
    const innerEl = block.element('inner')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-static').class(this.staticCol),
        }}
      >
        <div
          class={{
            ...innerEl.class(),
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
