import { Component, Host, h } from '@stencil/core'
import globalScript from '../../../global'

@Component({
  tag: 'bal-doc-app',
  scoped: false,
  shadow: false,
  styleUrl: '../../../styles/global.scss',
})
export class DocApp {
  connectedCallback() {
    globalScript()
  }

  render() {
    return (
      <Host role="application">
        <main class="bal-app">
          <slot></slot>
        </main>
      </Host>
    )
  }
}
