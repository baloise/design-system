import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-link-list',
  styleUrl: 'bal-doc-link-list.sass',
})
export class DocLinkList implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() oneColumn = false

  render() {
    return (
      <Host
        class={{
          'bal-doc-link-list': true,
          'link-list': true,
          'has-one-column': this.oneColumn,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
