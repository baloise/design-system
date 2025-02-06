import { Component, Host, h, Element, ComponentInterface, State, Prop, Method } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { stopEventBubbling } from '../../../utils/form-input'
import { AccordionState } from '../../../interfaces'
import { BalConfigState, BalLanguage, defaultConfig, ListenToConfig } from '../../../utils/config'
import { i18nBalAccordion } from '../bal-accordion.i18n'
import { ariaBooleanToString } from 'packages/core/src/utils/aria'

@Component({
  tag: 'bal-accordion-trigger',
  styleUrl: 'bal-accordion-trigger.sass',
})
export class AccordionTrigger implements ComponentInterface, Loggable {
  private componentId = `bal-accordion-trigger-${accordionTriggerIds++}`

  @Element() el?: HTMLElement

  @State() parentAccordionId?: string
  @State() language: BalLanguage = defaultConfig.language

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
   * If `true` the button is aligned over the whole width
   */
  @Prop() expanded = true

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
   * The color to use from your application's color palette.
   */
  @Prop() color: BalProps.BalButtonColor = 'info'

  /**
   * Size of the button
   */
  @Prop() size: BalProps.BalButtonSize = ''

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
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get parentAccordionElement(): HTMLBalAccordionElement | null {
    return this.el?.closest('bal-accordion') || null
  }

  private get parentAccordionSummaryElement(): HTMLBalAccordionSummaryElement | null {
    return this.el?.closest('bal-accordion-summary') || null
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

  private onClick = (ev: MouseEvent) => {
    stopEventBubbling(ev)
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

    const parentSummaryEl = this.parentAccordionSummaryElement
    let triggerAttributes = {
      tabindex: -1,
    }
    if (parentSummaryEl && !parentSummaryEl.trigger) {
      triggerAttributes = {
        tabindex: 0,
      }
    }

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
            expanded={this.expanded}
            icon={icon}
            iconTurn={turn}
            color={this.color}
            size={this.size}
            title={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
            aria-label={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
            aria-expanded={ariaBooleanToString(this.active)}
            onClick={this.onClick}
          >
            {label}
          </bal-button>
        ) : (
          <button
            class={{
              ...block.element('button').class(),
              'bal-focused': parentSummaryEl && !parentSummaryEl.trigger,
            }}
            id={`${id}-button`}
            aria-controls={`${this.parentAccordionId}-details-content`}
            aria-expanded={ariaBooleanToString(this.active)}
            part={buttonPart}
            data-testid="bal-accordion-trigger"
            title={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
            aria-label={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
            onClick={this.onClick}
            {...triggerAttributes}
          >
            <bal-icon turn={turn} name={icon}></bal-icon>
          </button>
        )}
      </Host>
    )
  }
}

let accordionTriggerIds = 0
