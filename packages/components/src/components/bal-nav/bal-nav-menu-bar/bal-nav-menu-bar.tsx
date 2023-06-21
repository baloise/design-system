import { Component, h, ComponentInterface, Host, Element, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'

@Component({
  tag: 'bal-nav-menu-bar',
  styleUrls: {
    css: 'bal-nav-menu-bar.sass',
  },
})
export class NavMenuBar implements ComponentInterface, Loggable {
  private navMenuBarId = `bal-nav-menu-bar-${NavMenuBarIds++}`

  @Element() el!: HTMLElement

  @State() isHidden = false

  log!: LogInstance

  @Logger('bal-nav-menu-bar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Tells when to hide the bar
   */
  @Prop() hidden: BalProps.BalNavMenuBarHidden = 'none'

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalNavMenuBarContainer = 'default'

  /**
   * Defines the position of the bar
   */
  @Prop() position: BalProps.BalNavMenuBarPosition = 'none'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillRender() {
    const flyout = this.flyoutElement
    if (flyout) {
      flyout.containerSize = this.containerSize
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get flyoutElement() {
    return this.el.querySelector('bal-nav-menu-flyout')
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-menu-bar')
    const innerBlock = block.element('inner')

    return (
      <Host
        id={this.navMenuBarId}
        class={{
          ...block.class(),
          ...block.modifier(`hidden-mobile`).class(this.hidden === 'mobile'),
          ...block.modifier(`hidden-tablet`).class(this.hidden === 'tablet'),
          ...block.modifier(`position-${this.position}`).class(this.position !== 'none'),
        }}
      >
        <div
          class={{
            ...innerBlock.class(),
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
        </div>
      </Host>
    )
  }
}

let NavMenuBarIds = 0
