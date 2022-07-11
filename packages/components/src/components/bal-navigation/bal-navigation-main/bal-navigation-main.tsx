import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-navigation-main',
})
export class NavigationMain implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <slot name="main-head" />
        <slot name="main-body" />
      </Host>
    )
  }
}
