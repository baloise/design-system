import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-main-head',
})
export class NavigationMainHead implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const mainHeadEl = BEM.block('nav').element('main').element('head')
    return (
      <Host class={{ ...mainHeadEl.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
