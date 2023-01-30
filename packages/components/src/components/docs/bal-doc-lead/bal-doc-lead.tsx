import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-lead',
})
export class DocLead implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <bal-doc-app>
          <p class="is-size-large has-text-blue my-x-large">
            <slot></slot>
          </p>
        </bal-doc-app>
      </Host>
    )
  }
}
