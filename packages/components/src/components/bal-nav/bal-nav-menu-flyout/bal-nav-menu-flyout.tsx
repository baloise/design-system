import { Component, h, ComponentInterface, Host, Element, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-menu-flyout',
  styleUrls: {
    css: 'bal-nav-menu-flyout.sass',
  },
})
export class NavMenuFlyout implements ComponentInterface, Loggable {
  private navMenuFlyoutId = `bal-nav-menu-flyout-${NavMenuFlyOutIds++}`

  @Element() el!: HTMLElement

  @State() isHidden = false

  log!: LogInstance

  @Logger('bal-nav-menu-flyout')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalNavMenuFlyoutContainer = 'default'

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-menu-flyout')

    return (
      <Host
        id={this.navMenuFlyoutId}
        class={{
          ...block.class(),
        }}
      >
        <div
          class={{
            container: true,
            [`is-${this.containerSize}`]: this.containerSize !== 'default',
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let NavMenuFlyOutIds = 0
