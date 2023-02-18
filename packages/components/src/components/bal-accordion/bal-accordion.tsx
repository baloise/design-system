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
import { AccordionState } from '../../types'
import { attachComponentToConfig, BalConfigObserver, BalConfigState, detachComponentToConfig } from '../../utils/config'
import { BEM } from '../../utils/bem'
import { raf } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

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
  @Prop({ mutable: true, reflect: true }) value = false
  @Watch('value')
  protected async valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.balChange.emit(newValue)
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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    attachComponentToConfig(this)

    this.updateState(true)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  configChanged(state: BalConfigState): void {
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
  async present() {
    this.expandAccordion()
  }

  /**
   * Closes the accordion
   */
  @Method()
  async dismiss() {
    this.collapseAccordion()
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle() {
    if (this.value) {
      this.collapseAccordion()
    } else {
      this.expandAccordion()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateState = (initialUpdate = false) => {
    if (this.value) {
      this.expandAccordion(initialUpdate)
    } else {
      this.collapseAccordion(initialUpdate)
    }
  }

  private expandAccordion = (initialUpdate = false) => {
    this.value = true

    const { contentEl, contentElWrapper } = this
    if (initialUpdate || contentEl === undefined || contentElWrapper === undefined) {
      this.state = AccordionState.Expanded
      return
    }

    if (this.state === AccordionState.Expanded) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      raf(() => {
        this.state = AccordionState.Expanding

        this.currentRaf = raf(async () => {
          const contentHeight = contentElWrapper.offsetHeight
          const waitForTransition = transitionEndAsync(contentEl, 300)
          contentEl.style.setProperty('max-height', `${contentHeight}px`)

          await waitForTransition

          this.state = AccordionState.Expanded
          contentEl.style.removeProperty('max-height')
        })
      })
    } else {
      this.state = AccordionState.Expanded
    }
  }

  private collapseAccordion = (initialUpdate = false) => {
    this.value = false

    const { contentEl } = this
    if (initialUpdate || contentEl === undefined) {
      this.state = AccordionState.Collapsed
      return
    }

    if (this.state === AccordionState.Collapsed) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      this.currentRaf = raf(async () => {
        const contentHeight = contentEl.offsetHeight
        contentEl.style.setProperty('max-height', `${contentHeight}px`)

        raf(async () => {
          const waitForTransition = transitionEndAsync(contentEl, 300)

          this.state = AccordionState.Collapsing

          await waitForTransition

          this.state = AccordionState.Collapsed
          contentEl.style.removeProperty('max-height')
        })
      })
    } else {
      this.state = AccordionState.Collapsed
    }
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
    const label = this.value ? this.closeLabel : this.openLabel
    const icon = this.value ? this.closeIcon : this.openIcon
    const block = BEM.block('accordion')

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const buttonPart = expanded ? 'button expanded' : 'button'
    const contentPart = expanded ? 'content expanded' : 'content'

    return (
      <Host
        id={this.componentId}
        class={{
          ...block.class(),
          ...block.modifier('card').class(this.card),
          ...block.modifier('active').class(this.value),
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
          >
            <bal-button
              id={`${this.componentId}-button`}
              aria-controls={`${this.componentId}-content`}
              part={buttonPart}
              data-testid="bal-accordion-button"
              expanded={true}
              color={'info'}
              icon={icon}
              onClick={() => this.toggle()}
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
              data-testid="bal-accordion-content"
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
