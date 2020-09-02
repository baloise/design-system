import {
  Component,
  Host,
  h,
  Element,
  State,
  Listen,
  Event,
  EventEmitter,
  Method, Prop,
} from '@stencil/core'
import { CardStepOptions } from '../card-step/card-step'

@Component({
  tag: 'bal-card-steps',
  styleUrl: 'card-steps.scss',
  shadow: true,
})
export class CardSteps {
  @Element() element!: HTMLElement

  @State() stepOptions: CardStepOptions[] = []

  /**
   * If `true` a the style is ready for a dark background.
   */
  @Prop() inverted: boolean = false

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balCardStepsDidChange' }) stepsDidChange: EventEmitter<CardStepOptions>

  /**
   * Select a step.
   */
  @Method()
  async select(value: string): Promise<void> {
    this.steps.forEach((t) => t.setActive(t.value === value))
    this.readSteps()
  }

  componentWillLoad(): void {
    this.readSteps()
  }

  @Listen('balCardStepChanged')
  stepChanged(): void {
    this.readSteps()
  }

  private get steps(): HTMLBalCardStepElement[] {
    return Array.from(this.element.querySelectorAll('bal-card-step'))
  }

  private readSteps() {
    Promise.all(this.steps.map((value) => value.getOptions())).then(
      (stepOptions) => {
        this.stepOptions = stepOptions
      },
    )
  }

  private async onSelectStep(step: CardStepOptions): Promise<void> {
    if (!step.disabled) {
      await this.select(step.value)
      this.stepsDidChange.emit(step)
    }
  }

  render() {
    return (
      <Host>
        <div class={['tabs', this.inverted ? 'is-inverted' : ''].join(' ')}>
          <ul>
            {this.stepOptions.map((step, index) => (
              <li
                class={[
                  step.active ? 'is-active' : '',
                  step.disabled ? 'is-disabled' : '',
                  step.done ? 'is-done' : '',
                ].join(' ')}
              >
                <a onClick={() => this.onSelectStep(step)} title={step.label}>
                  <span class="step-index"><span>{index + 1}</span></span>
                </a>
                <span
                  class="bubble"
                  style={!step.hasBubble && { display: 'none' }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
        <slot/>
      </Host>
    )
  }
}
