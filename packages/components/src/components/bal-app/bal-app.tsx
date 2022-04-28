import { Component, Host, h } from '@stencil/core'
import globalScript from '../../global'

@Component({
  tag: 'bal-app',
})
export class App {
  connectedCallback() {
    globalScript()
  }

  render() {
    return (
      <Host role="application" class="bal-app">
        <slot></slot>
      </Host>
    )
  }
}
