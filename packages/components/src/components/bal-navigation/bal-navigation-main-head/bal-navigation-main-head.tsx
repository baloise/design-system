import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-main-head',
})
export class NavigationMainHead implements ComponentInterface {
  render() {
    const mainHeadEl = BEM.block('nav').element('main').element('head')
    return (
      <Host class={{ ...mainHeadEl.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
