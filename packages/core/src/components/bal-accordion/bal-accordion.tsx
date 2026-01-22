import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { AccordionState } from '../../interfaces'
import { BEM } from '../../utils/bem'
import { BalConfigObserver, BalConfigState, ListenToConfig } from '../../utils/config'
import { debounceEvent, raf, transitionEndAsync, waitForComponent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-accordion',
  styleUrl: 'bal-accordion.scss',
})
export class Accordion implements ComponentInterface, BalConfigObserver, Loggable {
  private componentId = `bal-accordion-${accordionIds++}`
  private currentRaf: number | undefined

  @Element() el!: HTMLStencilElement

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
      this.updateState()
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
   * Emitted when the accordion has opened or closed
   */
  @Event() balChange!: EventEmitter<BalEvents.BalAccordionChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalAccordionWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalAccordionDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  async connectedCallback() {
    this.debounceChanged()

    await waitForComponent(this.el as any)

    if (this.active) {
      this.activeChanged(this.active, false)
    }

    this.updateState(true)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
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
    return this.el?.querySelector(`#${this.componentId}-details`) || null
  }

  private get detailsWrapperElement(): HTMLDivElement | null {
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
    this.updateTriggerElement()
    this.updateDetailsElement()
    this.updateSummaryElement()
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
        this.balWillAnimate.emit(this.active)

        this.currentRaf = raf(async () => {
          const contentHeight = detailsWrapperElement.offsetHeight
          const waitForTransition = transitionEndAsync(detailsElement, 300)
          detailsElement.style.setProperty('max-height', `${contentHeight}px`)

          await waitForTransition

          this.setState(AccordionState.Expanded)
          detailsElement.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.active)
        })
      })
    } else {
      this.balWillAnimate.emit(this.active)
      this.setState(AccordionState.Expanded)
      this.balDidAnimate.emit(this.active)
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
          this.balDidAnimate.emit(this.active)

          await waitForTransition

          this.setState(AccordionState.Collapsed)
          detailsElement.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.active)
        })
      })
    } else {
      this.balDidAnimate.emit(this.active)
      this.setState(AccordionState.Collapsed)
      this.balDidAnimate.emit(this.active)
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
   * RENDER
   * ------------------------------------------------------
   */

  render() {
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
}

let accordionIds = 0
