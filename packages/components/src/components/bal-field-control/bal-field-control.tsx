import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-field-control',
  shadow: false,
  scoped: true,
})
export class FieldControl {
  /**
   * @internal
   */
  @Prop() invalid: boolean = false

  /**
   * @internal
   */
  @Prop() touched: boolean = false

  /**
   * @internal
   */
  @Prop() loading: boolean = false

  /**
   * @internal
   */
  @Prop() inverted: boolean = false

  /**
   * @internal
   */
  @Prop() disabled: boolean = false

  get buildValidationIconTemplate() {
    if (this.touched && !this.loading && !this.disabled) {
      return <bal-icon class="is-validation-icon" name={this.invalid ? 'close' : 'check'} color={this.invalid ? 'danger' : 'success'} />
    }
    return ''
  }

  render() {
    return (
      <Host
        class={{
          'control': true,
          'is-loading': this.loading,
          'has-validation-icon': this.touched === true,
        }}
      >
        <slot></slot>
        {this.buildValidationIconTemplate}
      </Host>
    )
  }
}
