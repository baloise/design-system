import { Component, Host, h } from '@stencil/core'
import globalScript from '../../../global'

globalScript()

@Component({
  tag: 'bal-doc-story',
})
export class DocStory {
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
