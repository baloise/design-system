import { Component, h, Host, Method, State } from '@stencil/core'

@Component({
  tag: 'bal-navbar-menu',
  scoped: false,
  shadow: false,
})
export class NavbarMenu {
  @State() isMenuActive = false

  /**
   * PRIVATE: Collapses the menu.
   */
  @Method()
  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
  }

  render() {
    return (
      <Host class={'navbar-menu' + (this.isMenuActive ? ' is-active' : '')}>
        <slot></slot>
      </Host>
    )
  }
}
