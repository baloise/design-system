import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-dropdown-trigger',
  shadow: false,
  scoped: false,
})
export class DropdownTrigger {
  render() {
    return (
      <Host class="dropdown-trigger">
        <slot />
      </Host>
    )
  }
}
