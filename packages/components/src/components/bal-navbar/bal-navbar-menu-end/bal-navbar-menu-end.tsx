import { Component, h, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navbar-menu-end',
  scoped: false,
  shadow: false,
})
export class NavbarMenuEnd {
  render() {
    const menuEndEl = BEM.block('navbar').element('menu').element('end')

    return (
      <Host class={{ ...menuEndEl.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
