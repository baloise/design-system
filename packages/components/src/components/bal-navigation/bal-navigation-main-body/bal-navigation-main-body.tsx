import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-navigation-main-body',
})
export class NavigationMainBody implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
