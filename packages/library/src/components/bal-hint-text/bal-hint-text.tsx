import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-text',
  styleUrl: 'bal-hint-text.scss',
  scoped: true,
  shadow: false,
})
export class HintText {
  render() {
    return (
      <Host>
        <p class="is-small has-text-white">
          <slot></slot>
        </p>
      </Host>
    )
  }
}
