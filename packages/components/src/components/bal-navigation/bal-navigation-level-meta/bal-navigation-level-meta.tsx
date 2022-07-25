import { Component, h, ComponentInterface, Host, Prop, Method, Event, EventEmitter, Element } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'
import { Events } from '../../../types'

@Component({
  tag: 'bal-navigation-level-meta',
})
export class NavigationLevelMeta implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `meta-value-${navigationLevelMetaIds++}`
  @Prop() link?: string
  @Prop() linkLabel?: string
  @Prop() tabLink?: string

  @Event() balClick!: EventEmitter<Events.BalNavigationLevelClickDetail>

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-main')
    console.log('Meta subLevels ', subLevels)
    const metaLevel: LevelInfo = {
      type: 'meta',
      value: this.value,
      label: this.label,
      link: this.link,
      linkLabel: this.linkLabel,
      tabLink: this.tabLink,
      subLevels,
      onClick: (event: MouseEvent) => this.balClick.emit(event),
    }
    console.log('Meta Level ', metaLevel)
    return metaLevel
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

let navigationLevelMetaIds = 0
