import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { AccordionState } from '../../../interfaces'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-accordion-details',
  styleUrl: 'bal-accordion-details.sass',
})
export class AccordionDetails implements ComponentInterface, Loggable {
  private componentId = `bal-accordion-details-${accordionDetailIds++}`
  @Element() el!: HTMLStencilElement

  log!: LogInstance

  @State() parentAccordionId?: string

  @Logger('bal-accordion-details')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Prop() state: AccordionState = AccordionState.Collapsed

  /**
   * @internal
   */
  @Prop() active = false

  /**
   * @internal
   */
  @Prop() animated = true

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.updateAccordionId()
  }

  componentWillRender() {
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
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('accordion').element('details')
    const containerEl = block.element('container')
    const wrapperEl = containerEl.element('wrapper')

    const id = this.parentAccordionId ? `${this.parentAccordionId}-details` : this.componentId

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const contentPart = expanded ? 'content expanded' : 'content'

    return (
      <Host
        id={id}
        class={{
          ...block.class(),
          ...block.modifier('active').class(this.active),
          ...block.modifier('expanding').class(this.state === AccordionState.Expanding),
          ...block.modifier('expanded').class(this.state === AccordionState.Expanded),
          ...block.modifier('collapsing').class(this.state === AccordionState.Collapsing),
          ...block.modifier('collapsed').class(this.state === AccordionState.Collapsed),
          ...block.modifier('animated').class(this.animated),
        }}
      >
        <div
          id={`${id}-content`}
          aria-labelledby={`${this.parentAccordionId}-trigger-button`}
          role="region"
          part={contentPart}
          class={{
            ...wrapperEl.class(),
          }}
          data-testid="bal-accordion-details"
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let accordionDetailIds = 0
