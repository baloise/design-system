import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-title',
  styleUrl: 'bal-hint-title.scss',
  scoped: true,
  shadow: false,
})
export class HintTitle {
  render() {
    return (
      <Host>
        <h3 class="title is-size-3 has-text-white">
          <slot></slot>
        </h3>
      </Host>
    )
  }
}
