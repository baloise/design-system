import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { Loggable, Logger, LogInstance, ValidateEmptyOrOneOf, ValidateEmptyOrType, setupValidation } from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'ds-card-subtitle',
  styleUrl: 'card-subtitle.host.scss',
  shadow: true,
})
export class CardSubtitle implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('card-subtitle')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the card text color becomes white.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly bold: boolean = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop()
  @ValidateEmptyOrOneOf('primary', 'secondary', 'success', 'warning', 'danger', '')
  readonly color: DS.HeadingColor = ''

  connectedCallback(): void {
    setupValidation(this)
  }

  render() {
    return (
      <Host
        class={{
          'card-header': true,
        }}
      >
        <span
          class={{
            'text': true,
            'is-bold': this.bold,
            [`is-${this.color}`]: this.color !== '' && !this.inverted,
            'is-inverted': this.inverted,
          }}
        >
          <slot></slot>
        </span>
      </Host>
    )
  }
}
