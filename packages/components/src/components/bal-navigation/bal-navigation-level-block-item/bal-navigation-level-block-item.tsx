import { Component, h, ComponentInterface, Host, Prop, Method, Event, EventEmitter } from '@stencil/core'
import { Events } from '../../../types'
import { LevelInfo } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-level-block-item',
})
export class NavigationLevelBlockItem implements ComponentInterface {
  @Prop() label = ''
  @Prop() value = `block-value-${navigationLevelBlockItemIds++}`
  @Prop() link?: string = undefined
  @Prop() linkLabel?: string = undefined

  @Event() balClick!: EventEmitter<Events.BalNavigationLevelClickDetail>

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const itemLevel: LevelInfo = {
      type: 'block-item',
      value: this.value,
      label: this.label,
      link: this.link,
      onClick: (event: MouseEvent) => this.balClick.emit(event),
    }

    console.log('Item level ', itemLevel)
    return itemLevel
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

let navigationLevelBlockItemIds = 0
