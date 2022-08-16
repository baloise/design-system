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
  @Prop() value = ''

  /**
   * Label for the tab.
   */
  @Prop() label = ''

  /**
   * Link to path.
   */
  @Prop() href = ''

  /**
   * If `true` a small red bubble is added to the tab.
   */
  @Prop() bubble = false

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
   * Tells if the item is hidden.
   */
  @Prop() hidden = false

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
      label: this.label,
      href: this.href,
      active: this.active,
      disabled: this.disabled,
      done: this.done,
      failed: this.failed,
      hasBubble: this.bubble,
      prevent: this.prevent,
      navigate: this.balNavigate,
      hidden: this.hidden,
    }
  }

  render() {
    return (
      <Host>
        <div style={{ display: this.isActive ? 'block' : 'none' }}>
          <slot />
        </div>
      </Host>
    )
  }
}
