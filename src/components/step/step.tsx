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
} from "@stencil/core"

export interface StepOptions {
  value: string
  label: string
  active: boolean
  disabled: boolean
  hasBubble: boolean
}

@Component({
  tag: "bal-step",
  styleUrl: "step.scss",
  shadow: true,
})
export class Step {
  @State() isContentHidden = true

  /**
   * This is the key of the step.
   */
  @Prop() value: string = ""

  /**
   * Label for the step.
   */
  @Prop() label: string = ""

  /**
   * If `true` a small red bubble is added to the step.
   */
  @Prop() bubble: boolean = false

  /**
   * If `true` the step is disabled.
   */
  @Prop() disabled: boolean = false

  /**
   * Tell's if the step is active and the content is visible.
   */
  @Prop() active: boolean = false

  @Watch("active")
  activatedHandler(newActive: boolean) {
    this.isContentHidden = !newActive
  }

  /**
   * Emitted when the steps get rendered.
   */
  @Event({ eventName: "balStepChanged" }) stepChanged: EventEmitter

  get options() {
    return {
      value: this.value,
      label: this.label,
      active: this.active,
      disabled: this.disabled,
      hasBubble: this.bubble,
    }
  }

  /**
   * Options of the step like label, value etc.
   */
  @Method()
  async getOptions(): Promise<StepOptions> {
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
      <Host>
        <div style={this.isContentHidden && { display: "none" }}>
          <slot />
        </div>
      </Host>
    )
  }
}
