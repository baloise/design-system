import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
  styleUrl: 'bal-field.scss',
  shadow: false,
  scoped: false,
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * If `true` the component takes the whole width
   */
  @Prop() expanded: boolean = false

  /**
   * If `true` the field loses opacity
   */
  @Prop() disabled: boolean = false

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted: boolean = false

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading: boolean = false

  @Watch('inverted')
  @Watch('disabled')
  @Watch('expanded')
  watchHandler() {
    this.updateChildControl()
  }

  componentWillLoad() {
    this.updateChildControl()
  }

  updateChildControl() {
    const controls = this.element.querySelectorAll('bal-input, bal-select, bal-datepicker')
    controls.forEach((control: any) => {
      control.disabled = this.disabled
      control.inverted = this.inverted
      control.expanded = this.expanded
    })
  }

  render() {
    return (
      <Host
        class={{
          'is-expanded': this.expanded,
        }}>
        <div
          class={{
            'form': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
          }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
