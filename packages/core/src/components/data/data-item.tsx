import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'
import { ValidateEmptyOrType, setupValidation } from '@utils'

/**
 * DataItem is a container for label-value pairs within ds-data.
 * Provides separate slots for label and value for semantic linking.
 *
 * @slot label - The label content (ds-data-label or text).
 * @slot - The value content (ds-data-value or other elements).
 */
@Component({
  tag: 'ds-data-item',
  styleUrl: 'data-item.host.scss',
  shadow: true,
})
export class DataItem implements DsComponentInterface {
  log!: LogInstance

  @Logger('data-item')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private labelId = `data-item-label-${Math.random().toString(36).slice(2, 9)}`
  private valueId = `data-item-value-${Math.random().toString(36).slice(2, 9)}`
  private hasCustomLabel = false

  /**
   * If `true` a bottom border is added to the data-item.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly border: boolean = false

  /**
   * If `true` the item gets a lighter font color.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the text will break and the height of the item increases.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly multiline: boolean = false

  /**
   * If `true` a small button with an edit icon is shown on the right.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly editable: boolean = false

  connectedCallback(): void {
    this.validateProps()
    setupValidation(this)
    this.assignSlotsToComponents()
  }

  componentWillUpdate(): void {
    this.validateProps()
    setupValidation(this)
  }

  private validateProps(): void {
    // Validation delegated to @Prop decorators and setupValidation
  }

  private assignSlotsToComponents(): void {
    // For backward compatibility: assign slot names to sub-components if no explicit slot is set
    const label = this.el.querySelector('ds-data-label') as HTMLElement | null
    const value = this.el.querySelector('ds-data-value') as HTMLElement | null

    if (label && !label.getAttribute('slot')) {
      label.slot = 'label'
    }
    if (value && !value.getAttribute('slot')) {
      value.slot = ''
    }

    this.detectCustomLabel()
  }

  private detectCustomLabel(): void {
    // Check if slot="label" contains a custom label element instead of ds-data-label
    const labelSlotContent = this.el.querySelector('[slot="label"]')
    this.hasCustomLabel = labelSlotContent?.tagName === 'LABEL'
  }

  render() {
    return (
      <Host
        class={{
          'is-bordered': this.border,
          'is-disabled': this.disabled,
          'is-multiline': this.multiline,
          'is-editable': this.editable,
        }}
      >
        <div class="item-container">
          {this.hasCustomLabel ? (
            <div class="label-container">
              <slot name="label"></slot>
            </div>
          ) : (
            <label id={this.labelId} class="label-container">
              <slot name="label"></slot>
            </label>
          )}
          <div id={this.valueId} class="value-container" aria-labelledby={this.hasCustomLabel ? undefined : this.labelId}>
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}
