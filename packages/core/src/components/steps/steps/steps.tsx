import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, ValidateEmptyOrType, ValidateRequiredAndType, setupValidation } from '@utils'

/**
 * Step renders a single step button inside a ds-steps group, showing a numbered circle, label, and connector line.
 *
 * @slot - An `<a>` element in navigation mode.
 */
@Component({
  tag: 'ds-steps',
  styleUrl: 'steps.host.scss',
  shadow: true,
})
export class Step implements DsComponentInterface {
  log!: LogInstance

  @Logger('step')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Index of the active step. Used to determine connector fill state.
   * Set by the parent ds-steps.
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('number')
  activeIndex: number = 0

  /**
   * If `true`, the step cannot be selected.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true`, the step is completed. Shows a checkmark icon in the circle.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly done: boolean = false

  /**
   * If `true`, the step is hidden from the layout.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly hidden: boolean = false

  /**
   * 1-based position index. Set by the parent ds-steps.
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('number')
  index: number = 0

  /**
   * If `true`, the step has an error. Shows an exclamation mark in the circle.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly invalid: boolean = false

  /**
   * Visible text label displayed below the circle.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * Unique name that links this step to a ds-step-panel[for] of the same value.
   */
  @Prop({ reflect: true })
  @ValidateRequiredAndType('string')
  readonly name!: string

  /**
   * Set by ds-steps. When true, renders in navigation mode (slotted <a>).
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('boolean')
  navigation: boolean = false

  /**
   * If `true`, this step is currently selected. Set by the parent ds-steps.
   * @internal
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('boolean')
  selected: boolean = false

  /**
   * Set by ds-steps. When true, renders in vertical layout.
   * @internal
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrType('boolean')
  vertical: boolean = false

  /**
   * Emitted when the user clicks this step (panels mode only).
   */
  @Event() dsStepSelect!: EventEmitter<{ name: string }>

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

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  // Validation is handled by @Validate decorators via setupValidation(this)

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) return
    ev.preventDefault()
    this.dsStepSelect.emit({ name: this.name })
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault()
      this.dsStepSelect.emit({ name: this.name })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const hostClass = {
      'is-selected': this.selected,
      'is-done': this.done,
      'is-invalid': this.invalid,
      'is-disabled': this.disabled,
      'is-hidden': this.hidden,
      'is-navigation': this.navigation,
      'is-vertical': this.vertical,
      'is-filled': this.index > 0 && this.index < this.activeIndex,
    }

    const circleContent = this.done ? (
      <ds-icon name="check" color="white" aria-hidden="true" />
    ) : this.invalid ? (
      <span class="step-invalid" aria-hidden="true">
        !
      </span>
    ) : (
      <span class="step-number" aria-hidden="true">
        {this.index}
      </span>
    )

    if (this.navigation) {
      return (
        <Host role="listitem" class={hostClass}>
          <span class="circle" aria-hidden="true">
            {circleContent}
          </span>
          <slot />
          <span class="connector" aria-hidden="true" />
        </Host>
      )
    }

    return (
      <Host
        role="tab"
        class={hostClass}
        aria-selected={String(this.selected)}
        aria-disabled={this.disabled ? 'true' : null}
        tabIndex={!this.disabled && this.selected ? 0 : -1}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <span class="circle">{circleContent}</span>
        {this.label && <span class="step-label">{this.label}</span>}
        <span class="connector" aria-hidden="true" />
      </Host>
    )
  }
}
