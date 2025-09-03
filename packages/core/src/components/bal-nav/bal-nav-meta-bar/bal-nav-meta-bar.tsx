import { Component, ComponentInterface, Element, Host, Listen, Prop, State, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { balBrowser } from '../../../utils/browser'
import { LogInstance, Loggable, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-meta-bar',
  styleUrl: 'bal-nav-meta-bar.sass',
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
   * Defines if the bar should stay on top of the backdrop
   */
  @Prop() stayOnTopOfBackdrop = false

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
  @Prop() invisible: BalProps.BalNavMetaBarInvisible = 'none'

  /**
   * Defines the position of the bar
   */
  @Prop() position: BalProps.BalNavMetaBarPosition = 'none'

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('scroll', { target: 'window', passive: true })
  handleScroll() {
    if (balBrowser.hasWindow && balBrowser.hasDocument && this.position === 'sticky-top') {
      const maxScrollHeight = document.body.scrollHeight - document.body.clientHeight
      const isOnTop = 0 >= window.scrollY
      const isOverViewportTop = 0 > window.scrollY
      const isOverViewportBottom = maxScrollHeight <= window.scrollY
      const didMoveDownwards = window.scrollY > this.previousY

      this.isHidden = !isOnTop && (didMoveDownwards || isOverViewportBottom || isOverViewportTop)
      this.previousY = window.scrollY

      const transformElements = Array.from(document.querySelectorAll('.bal-nav-meta-bar-transform'))
      if (transformElements.length > 0) {
        for (let index = 0; index < transformElements.length; index++) {
          const transformElement = transformElements[index]
          if (this.isHidden) {
            if (this.size === 'small') {
              transformElement.classList.remove(`bal-nav-meta-bar-transform-normal`)
              transformElement.classList.add(`bal-nav-meta-bar-transform-small`)
            } else {
              transformElement.classList.remove(`bal-nav-meta-bar-transform-small`)
              transformElement.classList.add(`bal-nav-meta-bar-transform-normal`)
            }
          } else {
            transformElement.classList.remove(`bal-nav-meta-bar-transform-small`)
            transformElement.classList.remove(`bal-nav-meta-bar-transform-normal`)
          }
        }
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-meta-bar')

    return (
      <Host
        id={this.navMetaBarId}
        class={{
          ...block.class(),
          ...block.modifier(`variant-${this.variant}`).class(),
          ...block.modifier(`size-${this.size}`).class(),
          ...block.modifier(`position-${this.position}`).class(this.position !== 'none'),
          ...block.modifier(`hidden-mobile`).class(this.invisible === 'mobile'),
          ...block.modifier(`hidden-tablet`).class(this.invisible === 'tablet'),
          ...block.modifier(`stay-on-top`).class(this.stayOnTopOfBackdrop),
        }}
      >
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

let NavMetaBarIds = 0
