import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-field-control',
  shadow: false,
  scoped: true,
})
export class FieldControl {
  /**
   * Baloise icon for the right side of the input
   */
  @Prop() iconRight: string = ''

  /**
   * Baloise icon for the left side of the input
   */
  @Prop() iconLeft: string = ''

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading: boolean = false

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted: boolean = false

  get buildIconLeftTemplate() {
    if (this.iconLeft) {
      return <bal-icon name={this.iconLeft} color="info" class="is-left" size="small" inverted={this.inverted} />
    }
    return ''
  }

  get buildIconRightTemplate() {
    if (this.iconRight) {
      return <bal-icon name={this.iconRight} color="info" class="is-right" size="small" inverted={this.inverted} />
    }
    return ''
  }

  render() {
    return (
      <Host
        class={{
          'control': true,
          'has-icons-left': !!this.iconLeft,
          'has-icons-right': !!this.iconRight || this.loading,
          'is-loading': this.loading,
        }}>
        <slot></slot>
        {this.buildIconLeftTemplate}
        {this.buildIconRightTemplate}
      </Host>
    )
  }
}
