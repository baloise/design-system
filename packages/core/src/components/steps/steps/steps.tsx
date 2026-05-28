import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  Logger,
  type LogInstance,
  stopEventBubbling,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsComponentInterface } from '@global'
import { STEPS_COLORS, StepsColor, StepsChangeDetail } from '../steps.interfaces'

/**
 * Steps coordinates ds-step and ds-step-panel children into an accessible stepped interface, supporting panels and navigation variants.
 *
 * @slot - ds-step-panel children (panels variant).
 * @slot step - ds-step children; managed automatically by ds-steps.
 * @part steplist - The steplist container.
 */
@Component({
  tag: 'ds-steps',
  styleUrl: 'steps.host.scss',
  shadow: true,
})
export class Steps implements DsComponentInterface {
  log!: LogInstance

  @Logger('steps')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Accent color applied to inactive circles and connector lines.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...STEPS_COLORS)
  readonly color: StepsColor = ''

  /**
   * Accessible label for the navigation landmark (navigation variant only).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * The `name` of the currently selected ds-step (panels variant).
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('string')
  value?: string | null

  /**
   * If `true`, the steplist is displayed vertically.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly vertical: boolean = false

  /**
   * Emitted when the selected step changes (panels variant only).
   */
  @Event() dsChange!: EventEmitter<StepsChangeDetail>

  private steplistEl?: HTMLElement

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  componentDidLoad() {
    this.setup()
  }

  componentDidUpdate() {
    this.updateChildren()
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  // Validation is handled by @Validate decorators via setupValidation(this)

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsStepSelect')
  listenToDsStepSelect(ev: CustomEvent<{ name: string }>) {
    stopEventBubbling(ev)
    this.activateStep(ev.detail.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private getSteps(): HTMLDsStepElement[] {
    return Array.from(this.el.querySelectorAll<HTMLDsStepElement>(':scope > ds-step'))
  }

  private getPanels(): HTMLDsStepPanelElement[] {
    return Array.from(this.el.querySelectorAll<HTMLDsStepPanelElement>(':scope > ds-step-panel'))
  }

  private isNavigation(): boolean {
    return this.getPanels().length === 0
  }

  private setup() {
    const steps = this.getSteps()
    const panels = this.getPanels()
    const isNav = this.isNavigation()

    let visibleIndex = 0
    steps.forEach(step => {
      step.slot = 'step'
      step.navigation = isNav
      step.vertical = this.vertical

      if (!step.hidden) {
        visibleIndex++
        step.index = visibleIndex
      } else {
        step.index = 0
      }

      if (!isNav && step.name) {
        if (!step.id) step.id = `ds-step-${stepIds++}`
        const panel = panels.find(p => p.for === step.name)
        if (panel) {
          if (!panel.id) panel.id = `ds-step-panel-${stepIds++}`
          step.setAttribute('aria-controls', panel.id)
          panel.setAttribute('aria-labelledby', step.id)
        }
      }
    })

    if (!isNav && !this.value) {
      const first = steps.find(s => !s.hidden && !s.disabled)
      if (first) this.value = first.name
    }

    this.updateChildren()
  }

  private updateChildren() {
    const isNav = this.isNavigation()
    const steps = this.getSteps()
    const panels = this.getPanels()

    const activeStep = steps.find(s => s.name === this.value)
    const activeIndex = activeStep ? activeStep.index : 0

    steps.forEach(step => {
      step.navigation = isNav
      step.vertical = this.vertical
      step.selected = isNav ? !!step.querySelector('[aria-current]') : step.name === this.value
      step.activeIndex = activeIndex
    })

    panels.forEach(panel => {
      panel.selected = panel.for === this.value
    })
  }

  private activateStep(name: string) {
    if (name === this.value) return
    const step = this.getSteps().find(s => s.name === name)
    if (step?.disabled) return
    this.value = name
    this.dsChange.emit({ value: name })
    this.focusSelectedStep()
  }

  private focusSelectedStep() {
    const selected = this.getSteps().find(s => s.name === this.value)
    selected?.focus()
  }

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isNavigation()) return
    const focusable = this.getSteps().filter(s => !s.disabled && !s.hidden)
    const currentIndex = focusable.findIndex(s => s.name === this.value)

    const isForward = this.vertical ? ev.key === 'ArrowDown' : ev.key === 'ArrowRight'
    const isBackward = this.vertical ? ev.key === 'ArrowUp' : ev.key === 'ArrowLeft'

    if (ev.key === 'Home') {
      ev.preventDefault()
      this.activateStep(focusable[0]?.name)
    } else if (ev.key === 'End') {
      ev.preventDefault()
      this.activateStep(focusable[focusable.length - 1]?.name)
    } else if (isForward) {
      ev.preventDefault()
      this.activateStep(focusable[(currentIndex + 1) % focusable.length]?.name)
    } else if (isBackward) {
      ev.preventDefault()
      this.activateStep(focusable[(currentIndex - 1 + focusable.length) % focusable.length]?.name)
    }
  }

  private handleSlotChange = () => {
    this.setup()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const isNav = this.isNavigation()

    const hostClass = {
      'is-vertical': this.vertical,
      'is-navigation': isNav,
      'is-purple': this.color === 'purple',
      'is-green': this.color === 'green',
      'is-red': this.color === 'red',
      'is-yellow': this.color === 'yellow',
    }

    const slotRef = (el?: HTMLElement) => {
      if (el) this.steplistEl = el
    }

    if (isNav) {
      return (
        <Host class={hostClass}>
          <nav aria-label={this.label || undefined}>
            <ol id="steplist" part="steplist" ref={slotRef}>
              <slot name="step" onSlotchange={this.handleSlotChange} />
            </ol>
          </nav>
          <slot onSlotchange={this.handleSlotChange} />
        </Host>
      )
    }

    return (
      <Host class={hostClass}>
        <div
          id="steplist"
          part="steplist"
          role="tablist"
          aria-orientation={this.vertical ? 'vertical' : undefined}
          onKeyDown={this.handleKeyDown}
          ref={slotRef}
        >
          <slot name="step" onSlotchange={this.handleSlotChange} />
        </div>
        <slot onSlotchange={this.handleSlotChange} />
      </Host>
    )
  }
}

let stepIds = 0
