import {
  Component,
  Host,
  h,
  Element,
  State,
  Listen,
  Event,
  EventEmitter,
  Method,
} from "@stencil/core"
import { StepOptions } from "../step/step"

@Component({
  tag: "bal-steps",
  styleUrl: "steps.scss",
  shadow: true,
})
export class Steps {
  @Element() element!: HTMLElement

  @State() stepOptions: StepOptions[] = []

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: "balStepsDidChange" }) stepsDidChange: EventEmitter<
    StepOptions
  >

  /**
   * Select a step.
   */
  @Method()
  async select(value: string) {
    this.steps.forEach((t) => t.setActive(t.value === value))
    this.readSteps()
  }

  componentWillLoad() {
    this.readSteps()
  }

  @Listen("balStepChanged")
  stepChanged() {
    this.readSteps()
  }

  private get steps(): HTMLBalStepElement[] {
    return Array.from(this.element.querySelectorAll("bal-step"))
  }

  private readSteps() {
    Promise.all(this.steps.map((value) => value.getOptions())).then(
      (stepOptions) => {
        this.stepOptions = stepOptions
      },
    )
  }

  private async onSelectStep(step: StepOptions) {
    if (!step.disabled) {
      await this.select(step.value)
      this.stepsDidChange.emit(step)
    }
  }

  render() {
    return (
      <Host>
        <div class={["tabs is-fullwidth"].join(" ")}>
          <ul>
            {this.stepOptions.map((step, index) => (
              <li
                class={[
                  step.active ? "is-active" : "",
                  step.disabled ? "is-disabled" : "",
                ].join(" ")}
              >
                <a onClick={() => this.onSelectStep(step)}>
                  <span class="step-index"><span>{index + 1}</span></span>
                  <span class="step-label">{step.label}</span>
                </a>
                <span
                  class="bubble"
                  style={!step.hasBubble && { display: "none" }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
        <slot />
      </Host>
    )
  }
}
