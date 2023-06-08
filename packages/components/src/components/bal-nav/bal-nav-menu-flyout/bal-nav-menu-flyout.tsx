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
   * If `true` the flyout is open
   */
  @Prop() active = false

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalNavMenuBarContainer = 'default'

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
          ...block.modifier('active').class(this.active),
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
