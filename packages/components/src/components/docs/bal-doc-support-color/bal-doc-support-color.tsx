import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-support-color',
})
export class BalDocSupportColor {
  @Prop() color = ''

  render() {
    return (
      <Host>
        <div class="columns is-multiline">
          <bal-doc-color class="column is-2" color={`${this.color}-1`} scss-vars={`$${this.color}-1`}></bal-doc-color>
          <bal-doc-color class="column is-2" color={`${this.color}-2`} scss-vars={`$${this.color}-2`}></bal-doc-color>
          <bal-doc-color class="column is-2" color={`${this.color}-3`} scss-vars={`$${this.color}-3`}></bal-doc-color>
          <bal-doc-color class="column is-2" color={`${this.color}-4`} scss-vars={`$${this.color}-4`}></bal-doc-color>
          <bal-doc-color class="column is-2" color={`${this.color}-5`} scss-vars={`$${this.color}-5`}></bal-doc-color>
          <bal-doc-color class="column is-2" color={`${this.color}-6`} scss-vars={`$${this.color}-6`}></bal-doc-color>
        </div>
      </Host>
    )
  }
}
