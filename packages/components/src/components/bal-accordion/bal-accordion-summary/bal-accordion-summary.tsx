import { Component, Host, h, Element, ComponentInterface, Prop, State } from '@stencil/core'
import { BEM } from '@/components/utils/bem'
import { Loggable, Logger, LogInstance } from '@/components/utils/log'
import { stopEventBubbling } from '@/components/utils/form-input'
import { AccordionState } from '@/components/types'

@Component({
  tag: 'bal-accordion-summary',
  styleUrls: {
    css: 'bal-accordion-summary.sass',
  },
})
export class AccordionSummary implements ComponentInterface, Loggable {
  private componentId = `bal-accordion-summary-${accordionSummaryIds++}`

  @Element() el?: HTMLElement

  @State() parentAccordionId?: string

  log!: LogInstance

  @Logger('bal-accordion-summary')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the whole summary component acts as a trigger and can be clicked
   */
  @Prop() trigger = false

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) active = false

  /**
   * @internal
   */
  @Prop() state: AccordionState = AccordionState.Collapsed

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    const accordion = this.parentAccordionElement
    if (accordion) {
      accordion.version = 2
    }

    this.updateAccordionId()
  }

  disconnectedCallback() {
    const accordion = this.parentAccordionElement
    if (accordion) {
      accordion.version = 1
    }

    this.updateAccordionId()
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get parentAccordionElement(): HTMLBalAccordionElement | null {
    return this.el?.closest('bal-accordion') || null
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateAccordionId = () => (this.parentAccordionId = this.parentAccordionElement?.id)

  /**
   * EVENT HANDLER
   * ------------------------------------------------------
   */

  private onClick = (event: MouseEvent) => {
    stopEventBubbling(event)
    this.parentAccordionElement?.humanToggle()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('accordion').element('summary')

    const id = this.parentAccordionId ? `${this.parentAccordionId}-summary` : this.componentId

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const buttonPart = expanded ? 'button expanded' : 'button'

    let attributes = {}
    if (this.trigger) {
      attributes = {
        'aria-controls': `${this.parentAccordionId}-details-content`,
        'role': 'button',
        'part': buttonPart,
        'data-testid': 'bal-accordion-button',
        'onClick': this.onClick,
      }
    }

    return (
      <Host
        id={id}
        class={{
          ...block.class(),
          ...block.modifier('trigger').class(this.trigger),
        }}
        {...attributes}
        data-testid="bal-accordion-summary"
      ></Host>
    )
  }
}

let accordionSummaryIds = 0
