import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-icon',
  styleUrl: 'bal-icon.scss',
  shadow: false,
  scoped: false,
})
export class Icon {
  /**
   * The name of the icon without the bal-icon prefix.
   */
  @Prop() name = ''

  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'small' | 'medium' | 'large' | '' = ''

  /**
   * If `true` the icon can be positioned ot the right side of another component
   */
  @Prop() isRight = false

  /**
   * If `true` the icon can be positioned ot the left side of another component
   */
  @Prop() isLeft = false

  /**
   * If `true` the icon rotates like for a loading spinner
   */
  @Prop() rotate = false

  /**
   * If `true` the icon is rotated 180deg
   */
  @Prop() turn = false

  /**
   * Defines the color of the icon.
   */
  @Prop() color:
    | 'danger'
    | 'warning'
    | 'primary'
    | 'blue'
    | 'success'
    | 'grey'
    | 'white'
    | 'black'
    | 'blue-line'
    | 'blue-light-line'
    | '' = ''

  get sizeCssClass() {
    if (this.size && this.size.length > 0) {
      return `is-${this.size}`
    }
    return ''
  }

  get iconCssClass() {
    return `bal-icon-${this.name}`
  }

  render() {
    return (
      <Host>
        <span
          class={[
            'icon',
            this.isRight ? 'is-right' : '',
            this.isLeft ? 'is-left' : '',
            this.rotate ? 'rotate' : '',
            this.turn ? 'turn' : '',
            this.sizeCssClass,
          ].join(' ')}>
          <i class={['font', this.iconCssClass, this.color.length > 0 ? `has-text-${this.color}` : ''].join(' ')}></i>
        </span>
      </Host>
    )
  }
}
