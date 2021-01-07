import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-navbar-menu-start',
  scoped: false,
  shadow: false,
})
export class NavbarMenuStart {
  render() {
    return (
      <Host class="navbar-start">
        <slot></slot>
      </Host>
    )
  }
}
