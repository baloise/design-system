import {
  Component,
  Host,
  h,
  Element,
  Prop,
  Method,
  Event,
  EventEmitter,
  Watch,
  State,
  ComponentInterface,
} from '@stencil/core'
import { debounceEvent, transitionEndAsync } from '../../utils/helpers'
import { attachComponentToConfig, BalConfigObserver, BalConfigState, detachComponentToConfig } from '../../utils/config'
import { BEM } from '../../utils/bem'
import { raf } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { AccordionState } from '../../interfaces'

@Component({
  tag: 'bal-accordion',
  styleUrls: {
    css: 'bal-accordion.sass',
  },
})
export class Accordion implements ComponentInterface, BalConfigObserver, Loggable {
  private componentId = `bal-accordion-${accordionIds++}`
  private contentEl: HTMLDivElement | undefined
  private contentElWrapper: HTMLDivElement | undefined
  private currentRaf: number | undefined

  @Element() el?: HTMLElement

  @State() state: AccordionState = AccordionState.Collapsed
  @State() animated = true

  log!: LogInstance

  @Logger('bal-accordion')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the accordion is open.
   */
  @Prop({ mutable: true, reflect: true }) active = false
  @Watch('active')
  protected async activeChanged(newActive: boolean, oldActive: boolean) {
    if (newActive !== oldActive) {
      this.active = newActive
    }
  }

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0
  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop() openIcon = 'plus'

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop() closeIcon = 'close'

  /**
   * If `true` the accordion is used on the bottom of a card
   */
  @Prop() card = false

  /**
   * @internal
   * defines the version of the component
   */
  @Prop() version = 1

  /**
   * Emitted when the accordion has opened or closed
   */
  @Event() balChange!: EventEmitter<BalEvents.BalAccordionChangeDetail>

  /**
   * @internal Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalAccordionWillAnimateDetail>

  /**
   * @internal Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalAccordionDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)

    if (this.active) {
      this.activeChanged(this.active, false)
    }

    this.updateState(true)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    this.animated = state.animated
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Opens the accordion
   */
  @Method()
  async present(): Promise<boolean> {
    return this.expand()
  }

  /**
   * Closes the accordion
   */
  @Method()
  async dismiss(): Promise<boolean> {
    return this.collapse()
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle(): Promise<boolean> {
    if (this.active) {
      return this.collapse()
    } else {
      return this.expand()
    }
  }

  /**
   * @internal
   */
  @Method()
  async humanToggle(): Promise<boolean> {
    if (this.active) {
      await this.collapse()
    } else {
      await this.expand()
    }

    this.balChange.emit(this.active)
    return this.active
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get summaryElement(): HTMLBalAccordionSummaryElement | null {
    return this.el?.querySelector(`#${this.componentId}-summary`) || null
  }

  private get triggerElement(): HTMLBalAccordionTriggerElement | null {
    return this.el?.querySelector(`#${this.componentId}-trigger`) || null
  }

  private get detailsElement(): HTMLBalAccordionDetailsElement | HTMLDivElement | null {
    if (this.version === 1) {
      return this.contentEl || null
    }

    return this.el?.querySelector(`#${this.componentId}-details`) || null
  }

  private get detailsWrapperElement(): HTMLDivElement | null {
    if (this.version === 1) {
      return this.contentElWrapper || null
    }

    return this.el?.querySelector(`#${this.componentId}-details > div`) || null
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateState = (initialUpdate = false) => {
    if (this.active) {
      this.expand(initialUpdate)
    } else {
      this.collapse(initialUpdate)
    }
  }

  private setState = (state: AccordionState) => {
    this.state = state
    if (this.version === 2) {
      this.updateTriggerElement()
      this.updateDetailsElement()
      this.updateSummaryElement()
    }
  }

  private updateDetailsElement = () => {
    const detailsElement = this.detailsElement as HTMLBalAccordionDetailsElement | null
    if (detailsElement) {
      detailsElement.state = this.state
      detailsElement.active = this.active
      detailsElement.animated = this.animated
    }
  }

  private updateTriggerElement = () => {
    const triggerElement = this.triggerElement
    if (triggerElement) {
      triggerElement.state = this.state
      triggerElement.active = this.active
    }
  }

  private updateSummaryElement = () => {
    const summaryElement = this.summaryElement
    if (summaryElement) {
      summaryElement.state = this.state
      summaryElement.active = this.active
    }
  }

  private expand = (initialUpdate = false): boolean => {
    this.active = true

    const detailsElement = this.detailsElement
    const detailsWrapperElement = this.detailsWrapperElement
    if (initialUpdate || detailsElement === null || detailsWrapperElement === null) {
      this.setState(AccordionState.Expanded)
      return this.active
    }

    if (this.state === AccordionState.Expanded) {
      return this.active
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      raf(() => {
        this.setState(AccordionState.Expanding)

        this.currentRaf = raf(async () => {
          const contentHeight = detailsWrapperElement.offsetHeight
          const waitForTransition = transitionEndAsync(detailsElement, 300)
          detailsElement.style.setProperty('max-height', `${contentHeight}px`)
          this.balWillAnimate.emit()

          await waitForTransition

          this.setState(AccordionState.Expanded)
          detailsElement.style.removeProperty('max-height')
          this.balDidAnimate.emit()
        })
      })
    } else {
      this.balWillAnimate.emit()
      this.setState(AccordionState.Expanded)
      this.balDidAnimate.emit()
    }

    return this.active
  }

  private collapse = (initialUpdate = false): boolean => {
    this.active = false

    const detailsElement = this.detailsElement
    if (initialUpdate || detailsElement === null) {
      this.setState(AccordionState.Collapsed)
      return this.active
    }

    if (this.state === AccordionState.Collapsed) {
      return this.active
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      this.currentRaf = raf(async () => {
        const contentHeight = detailsElement.offsetHeight
        detailsElement.style.setProperty('max-height', `${contentHeight}px`)

        raf(async () => {
          const waitForTransition = transitionEndAsync(detailsElement, 300)

          this.setState(AccordionState.Collapsing)
          this.balDidAnimate.emit()

          await waitForTransition

          this.setState(AccordionState.Collapsed)
          detailsElement.style.removeProperty('max-height')
          this.balDidAnimate.emit()
        })
      })
    } else {
      this.balDidAnimate.emit()
      this.setState(AccordionState.Collapsed)
      this.balDidAnimate.emit()
    }

    return this.active
  }

  private shouldAnimate = () => {
    if (typeof (window as any) === 'undefined') {
      return false
    }

    return this.animated
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onTriggerClickV1 = () => {
    this.humanToggle()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return this.version === 2 ? this.renderVersion2() : this.renderVersion1()
  }

  renderVersion2() {
    const block = BEM.block('accordion')

    return (
      <Host
        id={this.componentId}
        class={{
          ...block.class(),
          ...block.modifier('active').class(this.active),
          ...block.modifier('card-v2').class(this.card),
          ...block.modifier('animated').class(this.animated),
        }}
      ></Host>
    )
  }

  renderVersion1() {
    const label = this.active ? this.closeLabel : this.openLabel
    const icon = this.active ? this.closeIcon : this.openIcon
    const block = BEM.block('accordion')

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const buttonPart = expanded ? 'button expanded' : 'button'
    const contentPart = expanded ? 'content expanded' : 'content'

    return (
      <Host
        id={this.componentId}
        class={{
          ...block.class(),
          ...block.modifier('card-v1').class(this.card),
          ...block.modifier('active').class(this.active),
          ...block.modifier('expanding').class(this.state === AccordionState.Expanding),
          ...block.modifier('expanded').class(this.state === AccordionState.Expanded),
          ...block.modifier('collapsing').class(this.state === AccordionState.Collapsing),
          ...block.modifier('collapsed').class(this.state === AccordionState.Collapsed),
          ...block.modifier('animated').class(this.animated),
        }}
      >
        <div
          class={{
            ...block.element('wrapper').class(),
          }}
        >
          <div
            class={{
              ...block.element('trigger').class(),
              ...block.element('trigger').modifier('card').class(this.card),
            }}
            data-testid="bal-accordion-summary"
          >
            <bal-button
              id={`${this.componentId}-button`}
              aria-controls={`${this.componentId}-content`}
              part={buttonPart}
              data-testid="bal-accordion-trigger"
              expanded={true}
              color={'info'}
              icon={icon}
              onClick={this.onTriggerClickV1}
            >
              {label}
            </bal-button>
          </div>
          <div
            id={`${this.componentId}-content`}
            aria-labelledby={`${this.componentId}-button`}
            role="region"
            part={contentPart}
            class={{
              ...block.element('content').class(),
              ...block.element('content').modifier('card').class(this.card),
            }}
            ref={contentEl => (this.contentEl = contentEl)}
          >
            <div
              id={`${this.componentId}-content-wrapper`}
              data-testid="bal-accordion-details"
              class={{
                ...block.element('content').element('wrapper').class(),
              }}
              ref={contentElWrapper => (this.contentElWrapper = contentElWrapper)}
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}

let accordionIds = 0
