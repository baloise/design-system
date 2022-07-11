import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-navigation-main-head',
})
export class NavigationMainHead implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
