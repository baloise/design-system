import { Component, Host, h, Prop, Method, State, Element, EventEmitter, Event } from '@stencil/core'
import { BalTabOption } from '../bal-tab.type'

@Component({
  tag: 'bal-tab-item',
})
export class TabItem {
  @Element() el!: HTMLElement

  @State() isActive = false

  /**
   * Tells if this route is active and overrides the bal-tabs value property.
   */
  @Prop() active = false

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
  @Prop() href = ''

  /**
   * If `true` a small red bubble is added to the tab.
   */
  @Prop() bubble: boolean | string = false

  /**
   * If `true` the tab is disabled.
   */
  @Prop() disabled = false

  /**
   * If `true` the step is marked as done.
   */
  @Prop() done = false

  /**
   * If `true` the step is marked as failed.
   */
  @Prop() failed = false

  /**
   * Tell's if the linking is done by a router.
   */
  @Prop() prevent = false

  /**
   * Tab icon not available for the steps.
   */
  @Prop() icon?: string = undefined

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

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
      value: this.value,
      icon: this.icon,
      label: this.label,
      href: this.href,
      active: this.active,
      disabled: this.disabled,
      done: this.done,
      failed: this.failed,
      bubble: this.bubble,
      passed: false,
      prevent: this.prevent,
      navigate: this.balNavigate,
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-tabs-item': true,
          'bal-tabs-item--active': this.isActive,
        }}
      >
        <slot />
      </Host>
    )
  }
}
