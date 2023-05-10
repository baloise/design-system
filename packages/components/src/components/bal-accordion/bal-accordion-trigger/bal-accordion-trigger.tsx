import { Component, Host, h, Element, ComponentInterface, State, Prop } from '@stencil/core'
import { BEM } from '../../../utils-new/bem'
import { Loggable, Logger, LogInstance } from '../../../utils-new/log'
import { stopEventBubbling } from '../../../utils-new/form-input'
import { AccordionState } from '../../../interfaces'

@Component({
  tag: 'bal-accordion-trigger',
  styleUrls: {
    css: 'bal-accordion-trigger.sass',
  },
})
export class AccordionTrigger implements ComponentInterface, Loggable {
  private componentId = `bal-accordion-trigger-${accordionTriggerIds++}`

  @Element() el?: HTMLElement

  @State() parentAccordionId?: string

  log!: LogInstance

  @Logger('bal-accordion-trigger')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Trigger will be a bal-button
   */
  @Prop() button = false

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop() openIcon = 'caret-down'

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop() closeIcon = ''

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
    const block = BEM.block('accordion').element('trigger')

    const id = this.parentAccordionId ? `${this.parentAccordionId}-trigger` : this.componentId

    const label = this.active ? this.closeLabel : this.openLabel

    let turn = false
    let icon = this.active ? this.closeIcon : this.openIcon
    if (this.closeIcon === '' || this.closeIcon === undefined || this.closeIcon === null) {
      turn = this.active
      icon = this.openIcon || 'caret-down'
    }

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const buttonPart = expanded ? 'button expanded' : 'button'

    return (
      <Host
        id={id}
        class={{
          ...block.class(),
        }}
      >
        {this.button ? (
          <bal-button
            id={`${id}-button`}
            aria-controls={`${this.parentAccordionId}-details-content`}
            part={buttonPart}
            data-testid="bal-accordion-trigger"
            expanded={true}
            color={'info'}
            icon={icon}
            iconTurn={turn}
            onClick={this.onClick}
          >
            {label}
          </bal-button>
        ) : (
          <button
            class={{
              ...block.element('button').class(),
            }}
            id={`${id}-button`}
            aria-controls={`${this.parentAccordionId}-details-content`}
            aria-label="accordion trigger"
            part={buttonPart}
            data-testid="bal-accordion-trigger"
            onClick={this.onClick}
          >
            <bal-icon turn={turn} name={icon}></bal-icon>
          </button>
        )}
      </Host>
    )
  }
}

let accordionTriggerIds = 0
