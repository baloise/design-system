import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-nav-link-group',
  styleUrl: 'bal-nav-link-group.sass',
})
export class NavLinkGroup implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-nav-link-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the color of the group
   */
  @Prop() color: BalProps.BalNavLinkGroupColor = ''

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link-group')
    const hasColor = this.color !== ''

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`is-${this.color}`).class(hasColor),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
