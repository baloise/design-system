import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core'
import { BalTeaserStepOption } from '../bal-teaser-step/bal-teaser-step.type'

@Component({
  tag: 'bal-teaser-steps',
  styleUrl: 'bal-teaser-steps.scss',
  shadow: false,
  scoped: true,
})
export class TeaserSteps {
  @Element() element!: HTMLElement

  @State() stepOptions: BalTeaserStepOption[] = []
  @State() label = ''

  /**
   * If `true` a the style is ready for a dark background.
   */
  @Prop() inverted: boolean = false

  /**
   * If `true` the steps navigation is hidden.
   */
  @Prop() hidden: boolean = false

  /**
   * If `true` the steps navigation has back button.
   */
  @Prop() hasBack: boolean = false

  /**
   * If `true` the navigation is handled by the component
   */
  @Prop() navigation: boolean = false

  /**
   * Label for back button
   */
  @Prop() backLabel: string = ''

  /**
   * Hides the navigation circles and adds the step label instead
   */
  @Prop() showLabel: boolean = false

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balTeaserStepChange' }) balChange!: EventEmitter<BalTeaserStepOption>

  /**
   * Emitted when the back button is clicked.
   */
  @Event() balBackClick!: EventEmitter<void>

  /**
   * Emitted when the step circle is clicked.
   */
  @Event({ eventName: 'balTeaserStepClick' }) balStepClick!: EventEmitter<BalTeaserStepOption>

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(step: BalTeaserStepOption): Promise<void> {
    this.steps.forEach(t => t.setActive(t.value === step.value))
    this.sync()
    this.balChange.emit(step)
  }

  @Method()
  async sync() {
    await Promise.all(this.steps.map(value => value.getOptions())).then(stepOptions => {
      this.stepOptions = stepOptions
    })
    const option = this.stepOptions.find(o => o.active)
    if (option && option.label) {
      this.label = option.label
    }
  }

  componentWillLoad(): void {
    this.sync()
  }

  private get steps(): HTMLBalTeaserStepElement[] {
    return Array.from(this.element.querySelectorAll('bal-teaser-step'))
  }

  private async onClickStepCircle(event: MouseEvent, step: BalTeaserStepOption): Promise<void> {
    if (this.navigation && !step.disabled) {
      await this.select(step)
    }
    this.balStepClick.emit(step)
    this.balNavigate.emit(event)
  }

  private async onBackButtonClick() {
    if (this.navigation) {
      let previousStepIndex = this.getPreviousStepIndex()
      let previousStep = this.stepOptions[previousStepIndex]
      if (previousStepIndex >= 0 && previousStep && !previousStep.disabled) {
        await this.select(previousStep)
      }
    }
    this.balBackClick.emit()
  }

  private getPreviousStepIndex() {
    let activeStepIndex = this.stepOptions.findIndex(el => el.active === true)
    return activeStepIndex - 1
  }

  render() {
    return (
      <Host>
        <div class={['teaser-steps-wrapper', this.inverted ? 'is-inverted' : ''].join(' ')}>
          <div class={['left-side', !this.hasBack ? 'is-hidden' : ''].join(' ')}>
            <a role="button" onClick={() => this.onBackButtonClick()}>
              <bal-icon class="nav-go-left" name="nav-go-large" inverted={this.inverted}></bal-icon>
              <span class="nav-go-left-label">{this.backLabel}</span>
            </a>
          </div>
          <h3 style={{ display: this.showLabel ? 'block' : 'none' }} class={['tab-title title is-size-3', this.inverted ? 'is-inverted' : ''].join(' ')}>
            {this.label}
          </h3>
          <div
            style={{ display: this.showLabel ? 'none' : 'block' }}
            class={['tabs', !this.navigation ? 'is-disabled' : '', this.inverted ? 'is-inverted' : '', this.hidden ? 'is-hidden' : ''].join(' ')}
          >
            <ul>
              {this.stepOptions
                .filter(step => !step.hidden && !this.hidden && !this.showLabel)
                .map((step, index) => (
                  <li class={[step.active ? 'is-active' : '', step.disabled ? 'is-disabled' : '', step.done ? 'is-done' : ''].join(' ')}>
                    <a onClick={(event: MouseEvent) => this.onClickStepCircle(event, step)} title={step.label}>
                      <span class="step-index">
                        <bal-text>{index + 1}</bal-text>
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div class={['right-side', !this.hasBack ? 'is-hidden' : ''].join(' ')}></div>
        </div>
        <slot />
      </Host>
    )
  }
}
