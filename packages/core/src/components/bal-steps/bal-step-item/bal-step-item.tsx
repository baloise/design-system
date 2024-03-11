import { Component, Host, h, Prop, Method, State, Element, EventEmitter, Event } from '@stencil/core'
import { Attributes, inheritTrackingAttributes } from '../../../utils/attributes'
import { BalStepOption } from '../bal-step.type'

@Component({
  tag: 'bal-step-item',
})
export class StepItem {
  private inheritAttributes: Attributes = {}

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
   * If `true` the tab is disabled.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * If `true` the step is marked as done.
   */
  @Prop({ reflect: true }) done = false

  /**
   * If `true` the step is hidden.
   */
  @Prop({ reflect: true }) invisible = false

  /**
   * If `true` the step is marked as failed.
   */
  @Prop({ reflect: true }) failed = false

  /**
   * Tell's if the linking is done by a router.
   */
  @Prop() prevent = false

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalStepItemNavigateDetail>

  componentWillLoad() {
    this.inheritAttributes = inheritTrackingAttributes(this.el)
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOptions(): Promise<BalStepOption> {
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
      target: this.target,
      active: this.active,
      disabled: this.disabled,
      done: this.done,
      invisible: this.invisible,
      failed: this.failed,
      passed: false,
      prevent: this.prevent,
      navigate: this.balNavigate,
      trackingData: this.inheritAttributes,
    }
  }

  render() {
    return (
      <Host
        role="tabpanel"
        class={{
          'bal-step-item': true,
          'bal-step-item--active': this.isActive,
        }}
      >
        <slot />
      </Host>
    )
  }
}
