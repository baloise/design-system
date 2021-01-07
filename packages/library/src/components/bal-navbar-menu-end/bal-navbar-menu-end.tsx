import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-navbar-menu-end',
  scoped: false,
  shadow: false,
})
export class NavbarMenuEnd {
  render() {
    return (
      <Host class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}
