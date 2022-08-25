import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-usage',
  styleUrl: 'bal-doc-usage.sass',
})
export class DocUsage implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="bal-doc-usage">
        <bal-doc-app>
          <div class="columns">
            <slot></slot>
          </div>
        </bal-doc-app>
      </Host>
    )
  }
}
