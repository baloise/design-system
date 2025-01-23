import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop, Watch } from '@stencil/core'
import { debounceEvent } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { BalStepOption } from './bal-step.type'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { areArraysEqual } from '../../utils/array'
import { stopEventBubbling } from '../../utils/form-input'
import { StepButton } from './components/step-button'
import { newBalStepOption } from './bal-step.util'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'

@Component({
  tag: 'bal-steps',
  styleUrl: 'bal-steps.sass',
})
export class Steps implements Loggable, BalMutationObserver, BalBreakpointObserver {
  @Element() el!: HTMLElement

  private stepsId = `bal-steps-${StepsIds++}`

  @State() store: BalStepOption[] = []
  @State() isMobile = balBreakpoints.isMobile

  log!: LogInstance

  @Logger('bal-steps')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Steps can be passed as a property or through HTML markup.
   */
  @Prop() options: BalStepOption[] = []

  @Watch('options')
  protected async optionChanged() {
    this.onOptionChange()
    if (this.options === undefined || this.options.length < 1) {
      this.mutationObserverActive = true
    } else {
      this.mutationObserverActive = false
    }
  }

  /**
   * If `true` the tabs or steps can be clicked.
   */
  @Prop() clickable = true

  /**
   * Defines the color of the steps so it can be placed on colored backgrounds
   */
  @Prop() color: BalProps.BalStepsColor = 'primary'

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * Value of the current active step
   */
  @Prop({ mutable: true }) value?: string = undefined

  @Watch('value')
  protected async valueChanged(newValue?: string, oldValue?: string) {
    if (newValue !== oldValue) {
      this.onOptionChange()
    }
  }

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<BalEvents.BalTabsChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.mutationObserverActive = this.options === undefined || this.options.length < 1
  }

  componentDidLoad() {
    this.onOptionChange()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-steps', 'bal-step-item'] })
  mutationListener(): void {
    this.onOptionChange()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
  }

  swiperOnChange(index: number): void {
    // this.value = index
    // this.balChange.emit(index)
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(step: BalStepOption) {
    this.value = step.value
  }

  /**
   * Find the options properties by its value
   */
  @Method()
  async getOptionByValue(value: string) {
    const options = this.store
    return options.find(option => option.value === value)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get items(): HTMLBalStepItemElement[] {
    return Array.from(this.el.querySelectorAll(`#${this.stepsId} > bal-step-item`))
  }

  private getStepOptions = () => {
    if (this.options.length > 0) {
      return [...this.options.map(newBalStepOption)]
    } else {
      return Promise.all(this.items.map(value => value.getOptions()))
    }
  }

  private updateStore = (newStore: BalStepOption[]) => {
    if (!areArraysEqual(this.store, newStore)) {
      this.store = newStore
    }
  }

  private setActiveItem = () => {
    const activeTabs = this.store.filter(t => t.active)
    if (activeTabs.length > 0) {
      const firstActiveTab = activeTabs[0]
      this.value = firstActiveTab.value
    } else {
      if (this.value === undefined && this.store.length > 0) {
        const firstStep = this.store[0]
        this.value = firstStep.value
      }
    }
  }

  private setActiveContent = () => {
    if (this.options.length === 0) {
      this.items.forEach(item => item.setActive(this.isActive(item)))
    }
  }

  private isActive(step: BalStepOption): boolean {
    return step.value === this.value
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onOptionChange = async () => {
    try {
      const options = await this.getStepOptions()
      this.updateStore(options)
      this.setActiveItem()
      this.setActiveContent()
    } catch (e) {
      console.warn('[WARN] - Could not read tab options')
    }
  }

  private onSelectTab = async (ev: MouseEvent, step: BalStepOption) => {
    if (step.prevent || step.disabled || !this.clickable) {
      stopEventBubbling(ev)
    }

    if (!step.disabled) {
      if (step.navigate) {
        step.navigate.emit(ev)
      }
      if (this.clickable) {
        if (step.value !== this.value) {
          this.balChange.emit(step.value)
          await this.select(step)
        }
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('steps')
    const bemStepsNav = block.element('nav')

    let hasPassed = true
    let index = -1

    const steps = this.store
      .map(step => ({ ...step, active: step.value === this.value }))
      .map(step => {
        if (step.active) {
          hasPassed = false
        }
        if (!step.invisible) {
          index = index + 1
        }
        return { ...step, passed: hasPassed, index }
      })

    return (
      <Host
        class={{
          ...block.class(),
        }}
        data-value={this.store
          .filter(t => this.isActive(t))
          .map(t => t.value)
          .join(',')}
        data-label={this.store
          .filter(t => this.isActive(t))
          .map(t => t.label)
          .join(',')}
      >
        <nav
          class={{
            ...bemStepsNav.class(),
          }}
          role="tablist"
          aria-live="polite"
        >
          {steps
            .filter(step => !step.invisible)
            .map(step => (
              <StepButton
                item={step}
                color={this.color}
                isMobile={this.isMobile}
                clickable={this.clickable && !step.disabled}
                onSelectTab={this.onSelectTab}
              ></StepButton>
            ))}
        </nav>
        <div
          id={this.stepsId}
          class={{
            ...block.element('steps__content').class(),
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let StepsIds = 0
