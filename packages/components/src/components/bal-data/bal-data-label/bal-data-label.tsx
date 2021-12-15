import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-data-label',
})
export class DataLabel {
  /**
   * If `true` an asterix is added after the label.
   */
  @Prop() required = false

  render() {
    return (
      <Host class="bal-data-label">
        <slot></slot>
        {this.required ? '*' : ''}
      </Host>
    )
  }
}
