import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu-start',
  scoped: false,
  shadow: false,
})
export class NavbarMenuStart {
  /**
   * TODO: describe
   */
  @Prop() interface: 'app' | 'simple' | 'meta' | 'stage' = 'app'

  render() {
    const menuStartEl = BEM.block('navbar').element('menu').element('start')

    return (
      <Host class={{ ...menuStartEl.class(), ...menuStartEl.modifier(this.interface).class() }}>
        <slot></slot>
      </Host>
    )
  }
}
