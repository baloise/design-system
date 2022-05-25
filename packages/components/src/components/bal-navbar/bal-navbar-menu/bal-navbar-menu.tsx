import { Component, h, Host, Method, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu',
  scoped: false,
  shadow: false,
})
export class NavbarMenu {
  @State() isMenuActive = false

  /**
   * @internal - If the menu is open it closes it and the other way around.
   */
  @Method()
  async toggle(isMenuActive: boolean): Promise<void> {
    this.isMenuActive = isMenuActive
  }

  render() {
    const menuEl = BEM.block('navbar').element('menu')

    return (
      <Host
        class={{
          ...menuEl.class(),
          ...menuEl.modifier('active').class(this.isMenuActive),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
