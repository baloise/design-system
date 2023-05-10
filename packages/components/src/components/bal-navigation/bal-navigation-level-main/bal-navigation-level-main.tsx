import { Component, h, ComponentInterface, Host, Prop, Method, Element, Event, EventEmitter } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'
import { Attributes, inheritTrackingAttributes } from '../../../utils-new/attributes'

@Component({
  tag: 'bal-navigation-level-main',
})
export class NavigationLevelMain implements ComponentInterface {
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `main-value-${navigationLevelMainIds++}`
  @Prop() link?: string = undefined
  @Prop() linkLabel?: string = undefined
  /**
   * It is 'true' when the meta item is used as a link and not as a tab
   */
  @Prop() isTabLink = false
  @Prop() target: BalProps.BalButtonTarget = '_self'
  @Event() balClick!: EventEmitter<BalEvents.BalNavigationLevelMainClickDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-block')

    return {
      type: 'main',
      value: this.value,
      label: this.label,
      link: this.link,
      target: this.target,
      linkLabel: this.linkLabel,
      isTabLink: this.isTabLink,
      subLevels,
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

let navigationLevelMainIds = 0
