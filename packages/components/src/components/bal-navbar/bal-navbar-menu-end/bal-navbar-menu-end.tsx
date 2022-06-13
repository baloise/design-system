import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu-end',
  scoped: false,
  shadow: false,
})
export class NavbarMenuEnd {
  /**
   * @internal
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: Props.BalNavbarInterface = 'app'

  render() {
    const menuEndEl = BEM.block('navbar').element('menu').element('end')

    return (
      <Host class={{ ...menuEndEl.class(), ...menuEndEl.modifier(`context-${this.interface}`).class() }}>
        <slot></slot>
      </Host>
    )
  }
}
