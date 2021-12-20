import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-app',
})
export class App {
  render() {
    return (
      <Host role="application" class="bal-app">
        <slot></slot>
      </Host>
    )
  }
}
