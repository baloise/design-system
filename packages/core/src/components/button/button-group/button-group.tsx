import { Component, Element, h, Host, Prop } from '@stencil/core'
import { Logger, LogInstance, ValidateEmptyOrOneOf, ValidateEmptyOrType, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_DIRECTIONS,
  ButtonGroupAlignment,
  ButtonGroupDirection,
} from '../button.interfaces'
import { DsComponentInterface } from '@global'

/**
 * Button group groups multiple buttons together with layout control for alignment and direction.
 *
 * @slot - One or more `ds-button` or `<button>` elements to group together.
 * @part group - The container element that wraps the grouped buttons.
 */
@Component({
  tag: 'ds-button-group',
  styleUrl: 'button-group.host.scss',
  shadow: true,
})
export class ButtonGroup implements DsComponentInterface {
  log!: LogInstance

  @Logger('button-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...BUTTON_GROUP_ALIGNMENTS)
  readonly align?: ButtonGroupAlignment

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...BUTTON_GROUP_DIRECTIONS)
  readonly direction: ButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly reverse: boolean = false

  /**
   * If `true` the buttons will expand to fill the available space on mobile.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly wide: boolean = false

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host>
        <div
          id="group"
          part="group"
          class={{
            'as-col': this.direction === 'column',
            'as-row': this.direction === 'row',
            'is-reverse': this.reverse,
            'is-wide': this.wide,
            'is-left': this.align === 'left',
            'is-center': this.align === 'center',
            'is-right': this.align === 'right',
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}
