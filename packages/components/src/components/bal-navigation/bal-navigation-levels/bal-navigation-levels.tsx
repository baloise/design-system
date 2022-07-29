import { Component, h, ComponentInterface, Host, Element, Method } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-levels',
})
export class NavigationLevels implements ComponentInterface {
  @Element() el!: HTMLElement

  @Method() async getLevelInfos(): Promise<LevelInfo[]> {
    return await readSubLevels(this.el, 'bal-navigation-level-meta')
  }

  render() {
    return (
      <Host style={{ display: 'none' }}>
        <slot></slot>
      </Host>
    )
  }
}
