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
  @Prop() iconRight = ''

  /**
   * Baloise icon for the left side of the input
   */
  @Prop() iconLeft = ''

  /**
   * If `true` on mobile devices the form control children are aligned verticaly and expanded to the full width
   */
  @Prop() expandedOnMobile?: boolean = undefined

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading = false

  get buildIconLeftTemplate() {
    if (this.iconLeft) {
      return <bal-icon name={this.iconLeft} color="info" class="is-left" size="small" />
    }
    return ''
  }

  get buildIconRightTemplate() {
    if (this.iconRight) {
      return <bal-icon name={this.iconRight} color="info" class="is-right" size="small" />
    }
    return ''
  }

  render() {
    return (
      <Host
        class={{
          'bal-field-control': true,
          'control': true,
          'has-icons-left': !!this.iconLeft,
          'has-icons-right': !!this.iconRight || this.loading,
          'is-loading': this.loading,
          'bal-field-control--expanded-on-mobile': !!this.expandedOnMobile,
        }}
      >
        <slot></slot>
        {this.buildIconLeftTemplate}
        {this.buildIconRightTemplate}
      </Host>
    )
  }
}
