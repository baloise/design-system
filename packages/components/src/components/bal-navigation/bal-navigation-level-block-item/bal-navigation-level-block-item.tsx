import { Component, h, ComponentInterface, Host, Prop, Method, Event, EventEmitter, Element } from '@stencil/core'
import { Events, Props } from '../../../types'
import { LevelInfo } from '../utils/level.utils'
import { Attributes, inheritTrackingAttributes } from '../../../utils/attributes'

@Component({
  tag: 'bal-navigation-level-block-item',
})
export class NavigationLevelBlockItem implements ComponentInterface {
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `block-value-${navigationLevelBlockItemIds++}`
  @Prop() link?: string = undefined
  @Prop() linkLabel?: string = undefined
  @Prop() target: Props.BalButtonTarget = '_self'

  @Event() balClick!: EventEmitter<Events.BalNavigationLevelClickDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    return {
      type: 'block-item',
      value: this.value,
      label: this.label,
      link: this.link,
      target: this.target,
      trackingData: this.inheritAttributes,
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

let navigationLevelBlockItemIds = 0
