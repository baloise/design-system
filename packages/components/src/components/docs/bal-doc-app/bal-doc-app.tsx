import { Component, Host, h } from '@stencil/core'
import { initialize } from '../../../config'

@Component({
  tag: 'bal-doc-app',
  scoped: false,
  shadow: false,
  styleUrl: '../../../styles/global.scss',
})
export class DocApp {
  connectedCallback() {
    initialize()
  }

  render() {
    return (
      <Host role="application" class={{ 'bal-app': true }}>
        <slot></slot>
      </Host>
    )
  }
}
