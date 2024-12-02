import { Component, Host, h, Prop, Method, State, Element, EventEmitter, Event } from '@stencil/core'
import { Attributes, inheritTrackingAttributes } from '../../../utils/attributes'
import { BalTabOption } from '../bal-tab.type'

@Component({
  tag: 'bal-tab-item',
})
export class TabItem {
  private inheritAttributes: Attributes = {}
  private tabPanelID = `bal-tab-panel-id-${panelID++}`

  @Element() el!: HTMLElement

  @State() isActive = false

  /**
   * Tells if this route is active and overrides the bal-tabs value property.
   */
  @Prop({ reflect: true }) active = false

  /**
   * This is the key of the tab.
   */
  @Prop({ reflect: true }) value = ''

  /**
   * Label for the tab.
   */
  @Prop({ reflect: true }) label = ''

  /**
   * Link to path.
   */
  @Prop({ reflect: true }) href = ''

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * If `true` a small red bubble is added to the tab.
   */
  @Prop({ reflect: true }) bubble: boolean | string = false

  /**
   * If `true` the tab is disabled.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * If `true` the step is hidden.
   */
  @Prop({ reflect: true }) invisible = false

  /**
   * Tell's if the linking is done by a router.
   */
  @Prop() prevent = false

  /**
   * Tab icon not available for the steps.
   */
  @Prop({ reflect: true }) icon?: string = undefined

  /**
   * If `true` the tab does not have a panel
   */
  @Prop() noPanel = false

  /**
   * A11y attributes for the native tab element.
   */
  @Prop() aria?: BalProps.BalTabItemAria = undefined

  /**
   * Sublabel for the tab.
   */
  @Prop({ reflect: true }) subLabel = ''

  /**
   * source for the svg icon
   */
  @Prop() svg = ''

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalTabItemNavigateDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOptions(): Promise<BalTabOption> {
    return this.options
  }

  /**
   * Sets the tab active.
   */
  @Method()
  async setActive(active: boolean): Promise<void> {
    this.isActive = active
  }

  get options() {
    return {
      tabPanelID: this.tabPanelID,
      value: this.value,
      icon: this.icon,
      label: this.label,
      href: this.href,
      target: this.target,
      active: this.active,
      disabled: this.disabled,
      invisible: this.invisible,
      bubble: this.bubble,
      passed: false,
      prevent: this.prevent,
      navigate: this.balNavigate,
      trackingData: this.inheritAttributes,
      noPanel: this.noPanel,
      aria: this.aria,
      subLabel: this.subLabel,
      svg: this.svg,
    }
  }

  render() {
    const hasPanel = !this.noPanel
    const noPanelOrInactive = !this.isActive || this.noPanel

    return (
      <Host
        id={this.tabPanelID}
        class={{
          'bal-tab-item': true,
          'bal-tab-item--active': this.isActive,
        }}
        role={hasPanel ? 'tabpanel' : undefined}
        aria-label={hasPanel ? this.label : undefined}
        aria-hidden={noPanelOrInactive ? 'true' : 'false'}
        tabindex={noPanelOrInactive ? '-1' : undefined}
        hidden={noPanelOrInactive ? true : undefined}
      >
        <slot />
      </Host>
    )
  }
}

let panelID = 0
