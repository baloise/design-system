import { Component, ComponentInterface, h, Host, Prop, Event, EventEmitter } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-product-slider-item',
})
export class ProductSliderItem implements ComponentInterface {
  private inputId = `bal-product-slider-item-${productSliderItemId++}`

  /**
   * Src path to the image
   */
  @Prop() src?: string

  /**
   * Label or title of the product
   */
  @Prop() label?: string

  /**
   * The type of button.
   */
  @Prop() elementType: Props.BalButtonElementType = 'button'

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop() name?: string = ''

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() value?: string | number = ''

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: Props.BalButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel?: string

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download?: string

  /**
   * Color of the background
   */
  @Prop() color?: Props.BalProductSliderItemColor

  /**
   * Emitted when the link element has clicked.
   */
  @Event() balNavigate!: EventEmitter<MouseEvent>

  /**
   * Emitted when the button has focus.
   */
  @Event() balFocus!: EventEmitter<void>

  /**
   * Emitted when the button loses focus.
   */
  @Event() balBlur!: EventEmitter<void>

  private onClick = (event: MouseEvent) => {
    if (this.href !== undefined) {
      this.balNavigate.emit(event)
    }
  }

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  render() {
    const { elementType, download, href, rel, target, name, value } = this

    const TagType = this.href === undefined ? 'button' : 'a'
    const attrs =
      TagType === 'button'
        ? { type: elementType, name, value }
        : {
            download,
            href,
            rel,
            target,
          }

    const block = BEM.block('product-slider-item')
    const button = block.element('button')
    const image = button.element('image')
    const label = button.element('label')

    return (
      <Host aria-id={this.inputId} class={{ ...block.class() }}>
        <TagType
          {...attrs}
          class={{ ...button.class(), ...button.modifier(`color-${this.color}`).class() }}
          part="native"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.onClick}
        >
          {this.src !== undefined ? <img class={{ ...image.class() }} src={this.src} /> : ''}
          {this.label !== undefined ? <span class={{ ...label.class(), 'is-bold': true }}>{this.label}</span> : ''}
          <slot></slot>
        </TagType>
      </Host>
    )
  }
}

let productSliderItemId = 0
