import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop, Watch, Listen } from '@stencil/core'
import { debounceEvent } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { BalStepOption } from './bal-step.type'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { areArraysEqual } from '@baloise/web-app-utils'
import { stopEventBubbling } from '../../utils/form-input'
import { ResizeHandler } from '../../utils/resize'
import { StepButton } from './components/step-button'
import { newBalStepOption } from './bal-step.util'
import { MutationHandler } from '../../utils/mutations'
import { balBreakpoints } from '../../utils/breakpoints'

@Component({
  tag: 'bal-steps',
  styleUrls: {
    css: 'bal-steps.sass',
  },
})
export class Steps implements Loggable {
  @Element() el!: HTMLElement

  private mutationHandler = MutationHandler({ tags: ['bal-steps', 'bal-step-item'] })
  private resizeWidthHandler = ResizeHandler()
  private stepsId = `bal-steps-${StepsIds++}`

  @State() isMobile = balBreakpoints.isMobile
  @State() store: BalStepOption[] = []

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
      this.mutationHandler.observe()
    } else {
      this.mutationHandler.stopObserve()
    }
  }

  /**
   * If `true` the tabs or steps can be clicked.
   */
  @Prop() clickable = true

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
    this.mutationHandler.connect(this.el, () => this.onOptionChange())

    if (this.options === undefined) {
      this.mutationHandler.observe()
    } else {
      this.mutationHandler.stopObserve()
    }
  }

  componentDidLoad() {
    this.onOptionChange()
  }

  disconnectedCallback() {
    this.mutationHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('resize', { target: 'window' })
  async resizeListener() {
    this.resizeWidthHandler(() => {
      this.isMobile = balBreakpoints.isMobile
    })
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

  private onSelectTab = async (event: MouseEvent, step: BalStepOption) => {
    if (step.prevent || step.disabled || !this.clickable) {
      stopEventBubbling(event)
    }

    if (!step.disabled) {
      if (step.navigate) {
        step.navigate.emit(event)
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
        if (!step.hidden) {
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
          role="tablist"
          class={{
            ...bemStepsNav.class(),
          }}
        >
          <bal-carousel
            class={{
              ...bemStepsNav.element('carousel').class(),
            }}
            onBalChange={stopEventBubbling}
            controls="small"
            items-per-view="auto"
            steps={3}
          >
            {steps
              .filter(step => !step.hidden)
              .map(step => (
                <bal-carousel-item
                  class={{
                    ...bemStepsNav.element('carousel').element('item').class(),
                    ...bemStepsNav.element('carousel').element('item').modifier('passed').class(step.passed),
                  }}
                >
                  <StepButton
                    item={step}
                    isMobile={this.isMobile}
                    clickable={this.clickable && !step.disabled}
                    onSelectTab={this.onSelectTab}
                  ></StepButton>
                </bal-carousel-item>
              ))}
          </bal-carousel>
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
