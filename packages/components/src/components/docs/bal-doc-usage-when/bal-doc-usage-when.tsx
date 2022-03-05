import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-usage-when',
})
export class DocUsageWhen implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="column">
        <div class="has-background-success-light has-radius-large p-4">
          <h3 class="is-size-4 mt-0">
            <bal-icon name="check-circle" inline size="" color="success" class="mr-3"></bal-icon>
            When to use
          </h3>
          <ul class="is-list ml-6">
            <slot></slot>
          </ul>
        </div>
      </Host>
    )
  }
}
