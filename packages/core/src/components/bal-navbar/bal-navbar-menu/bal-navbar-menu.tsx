import { Component, ComponentInterface, Element, h, Host, Method, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, balBreakpoints, ListenToBreakpoints } from '../../../utils/breakpoints'
import { deepReady } from '../../../utils/helpers'

@Component({
  tag: 'bal-navbar-menu',
  scoped: false,
  shadow: false,
})
export class NavbarMenu implements ComponentInterface, BalBreakpointObserver {
  @Element() element!: HTMLElement

  @State() isMenuActive = false
  @State() isTouch = balBreakpoints.isTouch

  /**
   * @internal
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: BalProps.BalNavbarInterface = 'app'

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
  }

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

    let container = ''
    if (this.isTouch) {
      const navbarEl = this.element.closest('bal-navbar')
      if (navbarEl) {
        container = navbarEl.container
      }
    }

    return (
      <Host
        class={{
          ...menuEl.class(),
          ...menuEl.modifier('active').class(this.isMenuActive),
          ...menuEl.modifier(`context-${this.interface}`).class(),
          container: true,
          [`is-${container}`]: container !== '',
        }}
      >
        <slot />
      </Host>
    )
  }
}
