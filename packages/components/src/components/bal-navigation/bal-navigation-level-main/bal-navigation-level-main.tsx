import { Component, h, ComponentInterface, Host, Prop, Method, Element, Event, EventEmitter } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'
import { Events, Props } from '../../../types'

@Component({
  tag: 'bal-navigation-level-main',
})
export class NavigationLevelMain implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `main-value-${navigationLevelMainIds++}`
  @Prop() link?: string = undefined
  @Prop() linkLabel?: string = undefined
  @Prop() tabLink?: string
  @Prop() target: Props.BalButtonTarget = '_self'
  @Event() balClick!: EventEmitter<Events.BalNavigationLevelClickDetail>

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-block')

    return {
      type: 'main',
      value: this.value,
      label: this.label,
      link: this.link,
      target: this.target,
      linkLabel: this.linkLabel,
      tabLink: this.tabLink,
      subLevels,
      onClick: (event: MouseEvent) => this.balClick.emit(event),
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

let navigationLevelMainIds = 0
