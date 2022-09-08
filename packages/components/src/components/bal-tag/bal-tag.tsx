import { Component, EventEmitter, h, Host, Prop, Event, Element } from '@stencil/core'
import { inheritAttributes } from '../../helpers/helpers'
import { BEM } from '../../utils/bem'
import { Props, Events } from '../../types'

@Component({
  tag: 'bal-tag',
  scoped: false,
  shadow: false,
})
export class Tag {
  @Element() el!: HTMLElement

  private inheritedAttributes: { [k: string]: any } = {}
  private inheritedAttributesClose: { [k: string]: any } = {}

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
   * Overwrites the default color to invalid style
   */
  @Prop() invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * Choosing left or center the tag is aligned to that side in the bal-card.
   */
  @Prop() position: Props.BalTagPlacement = 'left'
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
  @Event() balCloseClick!: EventEmitter<Events.BalTagCloseClickDetail>

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'title'])
    this.inheritedAttributesClose = inheritAttributes(this.el, ['tabindex'])
  }

  render() {
    const block = BEM.block('tag')
    const elLabel = block.element('label')
    const sizeClass = `is-${this.size}`
    const hasSize = this.size !== undefined
    const hasColor = this.color !== ''
    const colorClass = `is-${this.color}${this.light ? '-light' : ''}`
    const disabledClass = 'is-disabled'
    const hasDisabled = this.disabled
    const positionClass = `is-${this.position}`
    const hasPosition = this.position !== undefined

    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
          ...block.modifier(sizeClass).class(hasSize),
          ...block.modifier(colorClass).class(hasColor),
          ...block.modifier(disabledClass).class(hasDisabled),
          ...block.modifier(positionClass).class(hasPosition),
          ...block.modifier('is-invalid').class(this.invalid),
        }}
        {...this.inheritedAttributes}
      >
        <span
          class={{
            ...elLabel.class(),
            ...elLabel.modifier(sizeClass).class(hasSize),
            ...elLabel.modifier(colorClass).class(hasColor),
            ...elLabel.modifier(disabledClass).class(hasDisabled),
            ...elLabel.modifier('is-invalid').class(this.invalid),
          }}
        >
          <slot />
        </span>
        <bal-close
          class={{
            ...block.element('close').class(),
          }}
          style={{
            display: this.closable && !this.disabled ? 'flex' : 'none',
          }}
          size={this.size}
          inverted={
            (['blue', 'primary', 'info', 'success', 'warning', 'danger'].includes(this.color) && !this.light) ||
            this.invalid
          }
          onClick={(event: MouseEvent) => this.balCloseClick.emit(event)}
          {...this.inheritedAttributesClose}
        ></bal-close>
      </Host>
    )
  }
}
