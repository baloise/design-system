import { Component, Host, h } from '@stencil/core'
import globalScript from '../../../global'

globalScript()

@Component({
  tag: 'bal-doc-app',
  styleUrl: '../../../styles/global.sass',
})
export class DocApp {
  render() {
    return (
      <Host>
        <bal-app mode="css">
          <slot></slot>
        </bal-app>
      </Host>
    )
  }
}
