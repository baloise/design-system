import {
  Component,
  Host,
  h,
  Prop,
  Method,
  State,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core'

export interface CardStepOptions {
  value: string
  label: string
  active: boolean
  done: boolean
  disabled: boolean
  hidden: boolean
}

@Component({
  tag: 'bal-card-step',
  styleUrl: 'card-step.scss',
  shadow: true,
})
export class CardStep {
  @State() isContentHidden = true

  /**
   * This is the key of the step.
   */
  @Prop() value: string = ''

  /**
   * Label for the step.
   */
  @Prop() label: string = ''

  /**
   * If `true` the step is hidden in the steps navigation.
   */
  @Prop() hidden: boolean = false

  /**
   * If `true` the step is disabled.
   */
  @Prop() disabled: boolean = false

  /**
   * If `true` the step is done.
   */
  @Prop() done: boolean = false

  /**
   * Tell's if the step is active and the content is visible.
   */
  @Prop() active: boolean = false

  @Watch('active')
  activatedHandler(newActive: boolean) {
    this.isContentHidden = !newActive
  }

  /**
   * Emitted when the steps get rendered.
   */
  @Event({ eventName: 'balCardStepChanged' }) stepChanged: EventEmitter

  get options() {
    return {
      value: this.value,
      label: this.label,
      active: this.active,
      done: this.done,
      disabled: this.disabled,
      hidden: this.hidden,
    }
  }

  /**
   * Options of the step like label, value etc.
   */
  @Method()
  async getOptions(): Promise<CardStepOptions> {
    return this.options
  }

  /**
   * Sets the step active.
   */
  @Method()
  async setActive(active: boolean): Promise<void> {
    this.active = active
  }

  componentWillLoad() {
    this.isContentHidden = !this.active
  }

  render() {
    return (
      <Host class={{
        'is-hidden': this.isContentHidden,
        'card-step-content': true,
      }}>
        <slot/>
      </Host>
    )
  }
}
