import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-usage',
  styleUrl: 'bal-doc-usage.scss',
})
export class DocUsage implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <bal-doc-app>
          <div class="columns">
            <slot></slot>
          </div>
        </bal-doc-app>
      </Host>
    )
  }
}
