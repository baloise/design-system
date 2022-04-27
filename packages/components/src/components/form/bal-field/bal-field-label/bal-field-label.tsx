import { Component, h, Host, Prop, Element } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element!: HTMLElement
  parentBalFieldElement!: HTMLBalFieldElement | null

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

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
        <label class="label">
          <slot></slot>
        </label>
      </Host>
    )
  }
}
