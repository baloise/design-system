import { Component, h, ComponentInterface, Host, Element, Method } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-levels',
})
export class NavigationLevels implements ComponentInterface {
  @Element() el!: HTMLElement

  @Method() async getLevelInfos(): Promise<LevelInfo[]> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-meta')
    return subLevels
  }

  render() {
    return (
      <Host style={{ display: 'none' }}>
        <slot></slot>
      </Host>
    )
  }
}
