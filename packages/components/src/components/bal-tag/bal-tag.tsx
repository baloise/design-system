import { Component, EventEmitter, h, Host, Prop, Event } from '@stencil/core'
import { Props } from '../../props'

@Component({
  tag: 'bal-tag',
  scoped: false,
  shadow: false,
})
export class Tag {
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
   * @internal
   * Reduces the padding
   */
  @Prop() dense = false

  /**
   * @internal
   * Sets background color to transparent
   */
  @Prop() transparent = false

  /**
   * Emitted when the input got clicked.
   */
  @Event() balCloseClick!: EventEmitter<MouseEvent>

  get colorCssClass(): string {
    if (['danger', 'warning', 'success', 'info'].includes(this.color)) {
      return this.color !== '' ? `has-background-${this.color}-light` : ''
    }
    return this.color !== '' ? `is-${this.color}` : ''
  }

  get sizeCssClass(): string {
    return this.size === '' ? '' : `is-${this.size}`
  }

  render() {
    return (
      <Host
        class={{
          'tag': true,
          'is-light': this.light,
          'is-dense': this.dense,
          'is-transparent': this.transparent,
          [this.colorCssClass]: true,
          [this.sizeCssClass]: true,
        }}
      >
        <div class="is-flex is-align-items-center	">
          <bal-text
            bold
            inline
            size={this.size === 'small' ? 'small' : ''}
            color={this.color === 'primary' || this.color === 'blue' ? 'white' : ''}
          >
            <slot />
          </bal-text>
          <bal-close
            style={{
              display: this.closable ? 'flex' : 'none',
            }}
            inverted
            background
            onClick={(event: MouseEvent) => this.balCloseClick.emit(event)}
          ></bal-close>
        </div>
      </Host>
    )
  }
}
