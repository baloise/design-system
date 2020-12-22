import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-data-value',
  shadow: false,
  scoped: false,
})
export class DataValue {
  render() {
    return (
      <Host class="bal-data-value">
        <slot></slot>
      </Host>
    )
  }
}
