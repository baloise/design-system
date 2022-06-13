import { Component, h, Host, Method, State, Element, Prop } from '@stencil/core'
import { deepReady } from '../../../helpers/helpers'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu',
  scoped: false,
  shadow: false,
})
export class NavbarMenu {
  @Element() element!: HTMLElement

  @State() isMenuActive = false

  /**
   * @internal
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: Props.BalNavbarInterface = 'app'

  /**
   * @internal - If the menu is open it closes it and the other way around.
   */
  @Method()
  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
    const tabsElement = this.element.querySelector('bal-tabs')
    if (tabsElement) {
      await deepReady(tabsElement)
      tabsElement.renderLine()
    }
  }

  render() {
    const menuEl = BEM.block('navbar').element('menu')

    return (
      <Host
        class={{
          ...menuEl.class(),
          ...menuEl.modifier('active').class(this.isMenuActive),
          ...menuEl.modifier(`context-${this.interface}`).class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
