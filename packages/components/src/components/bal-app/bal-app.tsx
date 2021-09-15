import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-app',
  scoped: false,
  shadow: false,
})
export class App {
  render() {
    return (
      <Host class="bal-app">
        <slot></slot>
      </Host>
    )
  }
}
