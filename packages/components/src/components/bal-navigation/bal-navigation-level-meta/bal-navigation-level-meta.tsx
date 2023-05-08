import { Component, h, ComponentInterface, Host, Prop, Method, Event, EventEmitter, Element } from '@stencil/core'
import { LevelInfo, readSubLevels } from '../utils/level.utils'
import { Attributes, inheritTrackingAttributes } from '@/components/utils/attributes'

@Component({
  tag: 'bal-navigation-level-meta',
})
export class NavigationLevelMeta implements ComponentInterface {
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  @Prop() label = ''
  @Prop() value = `meta-value-${navigationLevelMetaIds++}`
  /**
   * sub link of the meta tab, rendered on touch resolution
   */
  @Prop() link?: string
  @Prop() linkLabel?: string
  /**
   * It is 'true' when the meta item is used as a link and not as a tab
   */
  @Prop() isTabLink?: boolean

  @Event() balClick!: EventEmitter<BalEvents.BalNavigationLevelMetaClickDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  @Method() async getLevelInfo(): Promise<LevelInfo> {
    const subLevels = await readSubLevels(this.el, 'bal-navigation-level-main')

    return {
      type: 'meta',
      value: this.value,
      label: this.label,
      link: this.link,
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

let navigationLevelMetaIds = 0
