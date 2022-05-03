import { Component, EventEmitter, h, Host, Prop, Event, Element } from '@stencil/core'
import { inheritAttributes } from '../../helpers/helpers'
import { Props } from '../../props'

@Component({
  tag: 'bal-tag',
  scoped: false,
  shadow: false,
})
export class Tag {
  @Element() el!: HTMLElement

  private inheritedAttributes: { [k: string]: any } = {}

  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() color: Props.BalTagColor = ''

  /**
   * The size of the tag element
   */
  @Prop() size: Props.BalTagSize = ''

  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() closable = false

  /**
   * If `true` a light version of the color is displayed
   */
  @Prop() light = false

  /**
   * @deprecated
   * @internal
   * Sets background color to transparent
   */
  @Prop() transparent = false

  /**
   * Emitted when the input got clicked.
   */
  @Event() balCloseClick!: EventEmitter<MouseEvent>

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'title'])
  }

  render() {
    return (
      <Host
        class={{
          'bal-tag': true,
          [`bal-tag--is-${this.size}`]: this.size !== '',
          [`bal-tag--is-${this.color}${this.light ? '-light' : ''}`]: this.color !== '',
        }}
        {...this.inheritedAttributes}
      >
        <span
          class={{
            'bal-tag__label': true,
            [`bal-tag__label--is-${this.size}`]: this.size !== '',
            [`bal-tag__label--is-${this.color}${this.light ? '-light' : ''}`]: this.color !== '',
          }}
        >
          <slot />
        </span>
        <bal-close
          class="bal-tag__close"
          style={{
            display: this.closable ? 'flex' : 'none',
          }}
          size={this.size}
          inverted={['blue', 'primary', 'info', 'success', 'warning', 'danger', ''].includes(this.color) && !this.light}
          onClick={(event: MouseEvent) => this.balCloseClick.emit(event)}
        ></bal-close>
      </Host>
    )
  }
}
