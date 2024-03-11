import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-nav-link-grid-col',
  styleUrl: 'bal-nav-link-grid-col.sass',
})
export class NavigationLinkGridCol implements ComponentInterface, Loggable {
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
    const widescreenPositionClass = this.staticCol ? 'is-one-third-widescreen' : 'is-two-thirds-widescreen'

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-static').class(this.staticCol),
          'column is-full is-6-desktop is-half-desktop': true,
          [`${widescreenPositionClass}`]: true,
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
