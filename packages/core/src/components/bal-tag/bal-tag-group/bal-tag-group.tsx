import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-tag-group',
  styleUrl: 'bal-tag-group.host.scss',
  shadow: true,
})
export class TagGroup {
  render() {
    return (
      <Host>
        <div class="tags">
          <slot />
        </div>
      </Host>
    )
  }
}
