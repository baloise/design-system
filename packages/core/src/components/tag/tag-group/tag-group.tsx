import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-tag-group',
  styleUrl: 'tag-group.host.scss',
  shadow: true,
})
export class TagGroup {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
