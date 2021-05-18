import { Component, EventEmitter, h, Host, Prop, Event } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

@Component({
  tag: 'bal-tag',
  scoped: false,
  shadow: false,
})
export class Tag {
  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() color: ColorTypes | '' = ''

  /**
   * The size of the tag element
   */
  @Prop() size: 'small' | 'medium' | 'large' | '' = ''

  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() closable: boolean = false

  /**
   * @internal
   * Reduces the padding
   */
  @Prop() dense: boolean = false

  /**
   * @internal
   * Sets background color to transparent
   */
  @Prop() transparent: boolean = false

  /**
   * Emitted when the input got clicked.
   */
  @Event() balCloseClick!: EventEmitter<MouseEvent>

  get colorCssClass(): string {
    return this.color !== '' ? `is-${this.color}` : 'default'
  }

  get sizeCssClass(): string {
    return this.size === '' ? '' : `is-${this.size}`
  }

  render() {
    return (
      <Host
        class={{
          'tag': true,
          'is-dense': this.dense,
          'is-transparent': this.transparent,
          [this.colorCssClass]: true,
          [this.sizeCssClass]: true,
        }}
      >
        <div class="is-flex is-align-items-center	">
          <bal-text small={this.dense}>
            <slot />
          </bal-text>
          <div
            style={{
              display: this.closable ? 'inline-block' : 'none',
            }}
            class={{
              'delete': true,
              'is-small': true,
            }}
            onClick={(event: MouseEvent) => this.balCloseClick.emit(event)}
          ></div>
        </div>
      </Host>
    )
  }
}
