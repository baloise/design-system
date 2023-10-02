import { Component, h, ComponentInterface, Host, Element, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BalResizeObserver, ListenToResize } from '../../../utils/resize'
import { BalScrollHandler } from '../../../utils/scroll'

@Component({
  tag: 'bal-nav-menu-flyout',
  styleUrls: {
    css: 'bal-nav-menu-flyout.sass',
  },
})
export class NavMenuFlyout implements ComponentInterface, Loggable, BalResizeObserver {
  private navMenuFlyoutId = `bal-nav-menu-flyout-${NavMenuFlyOutIds++}`
  private bodyScrollHandler = new BalScrollHandler()

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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  disconnectedCallback() {
    this.bodyScrollHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToResize()
  resizeListener() {
    if (this.isFlyoutScrollable()) {
      this.bodyScrollHandler.disable()
    } else {
      this.bodyScrollHandler.enable()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private isFlyoutScrollable() {
    return this.el?.scrollHeight > this.el?.clientHeight
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-menu-flyout')
    const line = block.element('line')

    return (
      <Host
        id={this.navMenuFlyoutId}
        class={{
          ...block.class(),
        }}
      >
        <div
          class={{
            ...line.class(),
          }}
        ></div>
        <div
          class={{
            container: true,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let NavMenuFlyOutIds = 0
