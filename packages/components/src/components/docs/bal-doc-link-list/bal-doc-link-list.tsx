import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-link-list',
  styleUrl: 'bal-doc-link-list.scss',
})
export class DocLinkList implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host className="link-list">
        <slot></slot>
      </Host>
    )
  }
}
