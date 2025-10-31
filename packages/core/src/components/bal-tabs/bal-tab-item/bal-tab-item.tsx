import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Attributes, inheritTrackingAttributes } from '../../../utils/attributes'
import { BalTabOption } from '../bal-tab.type'

@Component({
  tag: 'bal-tab-item',
})
export class TabItem {
  private inheritAttributes: Attributes = {}
  private tabPanelID = `bal-tab-panel-id-${panelID++}`

  @Element() el!: HTMLStencilElement

  @State() isActive = false
  @State() tabsId?: string = undefined

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
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop({ reflect: true }) rel: string | undefined

  /**
   * Link to path.
   */
  @Prop({ reflect: true }) href?: string = undefined

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
   * A11y attributes for the native button element.
   */
  @Prop() a11yControls?: string = undefined

  /**
   * Sub label for the tab.
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

  /**
   * Emitted when the link element has clicked
   */
  @Event() balKeyDown!: EventEmitter<BalEvents.BalTabItemKeyDownDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  /**
   * @internal
   */
  @Method()
  async setTabId(tabsId: string): Promise<void> {
    this.tabsId = tabsId
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
      rel: this.rel,
      target: this.target,
      active: this.active,
      disabled: this.disabled,
      invisible: this.invisible,
      bubble: this.bubble,
      passed: false,
      prevent: this.prevent,
      navigate: this.balNavigate,
      keyDown: this.balKeyDown,
      trackingData: this.inheritAttributes,
      noPanel: this.noPanel,
      a11yControls: this.a11yControls,
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
        aria-hidden={noPanelOrInactive ? 'true' : 'false'}
        aria-labelledby={this.tabsId ? `${this.tabsId}-button-${this.value}` : undefined}
        tabindex={noPanelOrInactive ? '-1' : undefined}
        hidden={noPanelOrInactive ? true : undefined}
      >
        <slot />
      </Host>
    )
  }
}

let panelID = 0
