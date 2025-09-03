import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { isDescendant } from '../../../utils/helpers'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BalResizeObserver, ListenToResize } from '../../../utils/resize'
import { BalScrollHandler } from '../../../utils/scroll'

@Component({
  tag: 'bal-nav-menu-flyout',
  styleUrl: 'bal-nav-menu-flyout.sass',
})
export class NavMenuFlyout implements ComponentInterface, Loggable, BalResizeObserver {
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
   * This is used to connect the flyout to the aria controls
   * */
  @Prop() navId = `bal-nav-x${NavMenuFlyOutIds++}`

  /**
   * Emitted when the flyout loses focus
   */
  @Event() balFocusOut!: EventEmitter<BalEvents.BalNavFlyoutFocusOutDetail>

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

  @Listen('focusout')
  onFocusLeave(event: FocusEvent) {
    if (this.el && event.relatedTarget && !isDescendant(this.el, event.relatedTarget)) {
      this.balFocusOut.emit(event)
    }
  }

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
        id={`${this.navId}-menu-flyout`}
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
            ...block.element('container').class(),
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}

let NavMenuFlyOutIds = 0
