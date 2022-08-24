import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-shades',
})
export class BalDocShades {
  @Prop() color = ''

  render() {
    return (
      <Host>
        <div class="columns is-multiline">
          <bal-doc-color background class="column is-2" color={`${this.color}-0`}></bal-doc-color>
          <bal-doc-color background class="column is-2" color={`${this.color}-1`}></bal-doc-color>
          <bal-doc-color background class="column is-2" color={`${this.color}-2`}></bal-doc-color>
          <bal-doc-color background class="column is-2" color={`${this.color}-3`}></bal-doc-color>
          <bal-doc-color background class="column is-2" color={`${this.color}-4`}></bal-doc-color>
        </div>
        <div class="columns is-multiline">
          <bal-doc-color background inverted class="column is-2" color={`${this.color}-5`}></bal-doc-color>
          <bal-doc-color background inverted class="column is-2" color={`${this.color}-6`}></bal-doc-color>
          <bal-doc-color background inverted class="column is-2" color={`${this.color}-7`}></bal-doc-color>
          <bal-doc-color background inverted class="column is-2" color={`${this.color}-8`}></bal-doc-color>
          <bal-doc-color background inverted class="column is-2" color={`${this.color}-9`}></bal-doc-color>
        </div>
      </Host>
    )
  }
}
