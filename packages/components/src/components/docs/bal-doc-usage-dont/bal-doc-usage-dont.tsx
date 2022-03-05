import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-usage-dont',
})
export class DocUsageDont implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="column">
        <div class="has-background-danger-light has-radius-large p-4">
          <h3 class="is-size-4 mt-0">
            <bal-icon name="alert-circle" inline size="" color="danger" class="mr-3"></bal-icon>
            When not to use
          </h3>
          <ul class="is-list ml-6">
            <slot></slot>
          </ul>
        </div>
      </Host>
    )
  }
}
