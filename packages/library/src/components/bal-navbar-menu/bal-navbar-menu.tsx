import { Component, h, Host, Method, State } from '@stencil/core'

@Component({
  tag: 'bal-navbar-menu',
  scoped: false,
  shadow: false,
})
export class NavbarMenu {
  @State() isMenuActive = false

  /**
   * *Internal* - If the menu is open it closes it and the other way around.
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
