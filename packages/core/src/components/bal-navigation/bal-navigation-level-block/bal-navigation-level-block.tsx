import { Component, h, ComponentInterface, Host, Prop, Method, Event, Element, EventEmitter } from '@stencil/core'
import { Attributes, inheritTrackingAttributes } from '../../../utils/attributes'
import { LevelInfo, readSubLevels } from '../utils/level.utils'

@Component({
  tag: 'bal-navigation-level-block',
})
export class NavigationLevelBlock implements ComponentInterface {
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `block-value-${navigationLevelBlockIds++}`
  @Prop() color: BalProps.BalNavigationLevelBlockColor = 'white'
  @Prop() link?: string = undefined
  @Prop() linkLabel?: string = undefined
  @Prop() target: BalProps.BalButtonTarget = '_self'

  @Event() balClick!: EventEmitter<BalEvents.BalNavigationLevelBlockClickDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-block-item')

    return {
      type: 'block',
      value: this.value,
      label: this.label,
      link: this.link,
      target: this.target,
      linkLabel: this.linkLabel,
      color: this.color,
      subLevels,
      trackingData: this.inheritAttributes,
      onClick: (ev: MouseEvent) => this.balClick.emit(ev),
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

let navigationLevelBlockIds = 0
