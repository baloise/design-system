import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-tag-group',
  scoped: false,
  shadow: false,
})
export class TagGroup {
  render() {
    return (
      <Host class="bal-tag-group">
        <slot />
      </Host>
    )
  }
}
