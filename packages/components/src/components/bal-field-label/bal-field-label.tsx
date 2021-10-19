import { Component, h, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element!: HTMLElement
  parrentBalFieldElement!: HTMLBalFieldElement | null

  componentDidLoad() {
    if (this.element) {
      this.parrentBalFieldElement = this.element.closest('bal-field')
      if (this.parrentBalFieldElement) {
        this.parrentBalFieldElement.classList.add('has-label')
      }
    }
  }

  disconnectedCallback() {
    if (this.parrentBalFieldElement) {
      this.parrentBalFieldElement.classList.remove('has-label')
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
