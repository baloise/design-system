import { Component, h, Host, Prop, Element } from '@stencil/core'
import { Props } from '../../../..'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element!: HTMLElement
  parentBalFieldElement!: HTMLBalFieldElement | null

  /**
   * If `true` a asterix (*) is added to the label text
   */
  @Prop() required = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() weight: Props.BalFieldLabelWeight = 'bold'

  componentDidLoad() {
    if (this.element) {
      this.parentBalFieldElement = this.element.closest('bal-field')
      if (this.parentBalFieldElement) {
        this.parentBalFieldElement.classList.add('has-label')
      }
    }
  }

  disconnectedCallback() {
    if (this.parentBalFieldElement) {
      this.parentBalFieldElement.classList.remove('has-label')
    }
  }

  render() {
    return (
      <Host>
        <label
          class={{
            'label': true,
            'is-regular': this.weight === 'regular',
          }}
        >
          <slot></slot>
          {this.required === true ? ' *' : ''}
        </label>
      </Host>
    )
  }
}
