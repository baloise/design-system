import { Component, h, ComponentInterface, Host, Element, Prop, Listen, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { balBrowser } from '../../../utils/browser'

@Component({
  tag: 'bal-nav-meta-bar',
  styleUrls: {
    css: 'bal-nav-meta-bar.sass',
  },
})
export class NavMetaBar implements ComponentInterface, Loggable {
  private navMetaBarId = `bal-nav-meta-bar-${NavMetaBarIds++}`
  private previousY = 0

  @Element() el!: HTMLElement

  @State() isHidden = false

  log!: LogInstance

  @Logger('bal-meta-bar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the color variant
   */
  @Prop() variant: BalProps.BalNavMetaBarVariant = 'primary'

  /**
   * Defines the height of the bar
   */
  @Prop() size: BalProps.BalNavMetaBarSize = 'normal'

  /**
   * Tells when to hide the bar
   */
  @Prop() hidden: BalProps.BalNavMetaBarHidden = 'none'

  /**
   * Defines the position of the bar
   */
  @Prop() position: BalProps.BalNavMetaBarPosition = 'none'

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalNavMetaBarContainer = 'default'

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('scroll', { target: 'window', passive: false })
  handleScroll() {
    if (balBrowser.hasWindow && this.position === 'sticky-top') {
      const maxScrollHeight = document.body.scrollHeight - document.body.clientHeight
      const isOnTop = 0 >= window.scrollY
      const isOverViewportTop = 0 > window.scrollY
      const isOverViewportBottom = maxScrollHeight <= window.scrollY
      const didMoveDownwards = window.scrollY > this.previousY

      this.isHidden = !isOnTop && (didMoveDownwards || isOverViewportBottom || isOverViewportTop)
      this.previousY = window.scrollY
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('meta-bar')

    return (
      <Host
        id={this.navMetaBarId}
        class={{
          ...block.class(),
          ...block.modifier(`variant-${this.variant}`).class(),
          ...block.modifier(`size-${this.size}`).class(),
          ...block.modifier(`position-${this.position}`).class(this.position !== 'none'),
          ...block.modifier(`hidden-mobile`).class(this.hidden === 'mobile'),
          ...block.modifier(`hidden-tablet`).class(this.hidden === 'tablet'),
          ...block.modifier(`position-sticky-top-transformed-${this.size}`).class(this.isHidden),
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

let NavMetaBarIds = 0
