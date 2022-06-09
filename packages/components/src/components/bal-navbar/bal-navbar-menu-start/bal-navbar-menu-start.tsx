import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu-start',
  scoped: false,
  shadow: false,
})
export class NavbarMenuStart {
  /**
   * @internal
   * Defines the type of navbar. App is used for almost every web applications
   * like the portal app. For our sales funnel we recommend to use the simple navbar.
   * Meta and main are used for the website.
   */
  @Prop() interface: Props.BalNavbarInterface = 'app'

  render() {
    const menuStartEl = BEM.block('navbar').element('menu').element('start')

    return (
      <Host
        class={{
          ...menuStartEl.class(),
          ...menuStartEl.modifier(`context-${this.interface}`).class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
