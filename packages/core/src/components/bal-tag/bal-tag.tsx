import { Component, EventEmitter, h, Host, Prop, Event, Element } from '@stencil/core'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { ariaBooleanToString } from '../../utils/aria'

@Component({
  tag: 'bal-tag',
  styleUrl: 'bal-tag.sass',
})
export class Tag {
  @Element() el!: HTMLElement

  private inheritedAttributes: { [k: string]: any } = {}
  private inheritedAttributesClose: { [k: string]: any } = {}

  /**
   * The theme type of the tag.
   */
  @Prop() color: BalProps.BalTagColor = ''

  /**
   * The size of the tag element
   */
  @Prop() size: BalProps.BalTagSize = ''

  /**
   * The theme type of the tag.
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
  @Prop() position: BalProps.BalTagPlacement = 'left'
  /**
   * If `true` a light version of the color is displayed
   */
  @Prop() light = false

  /**
   * @internal
   * Sets background color to transparent
   */
  @Prop() transparent = false

  /**
   * Emitted when the input got clicked.
   */
  @Event() balCloseClick!: EventEmitter<BalEvents.BalTagCloseClickDetail>

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
        aria-disabled={ariaBooleanToString(this.disabled)}
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
          data-testid="bal-tag-label"
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
          size={this.size === 'small' ? 'small' : ''}
          inverted={
            (['blue', 'primary', 'info', 'success', 'warning', 'danger', 'red', 'purple', 'yellow', 'green'].includes(
              this.color,
            ) &&
              !this.light) ||
            this.invalid
          }
          data-testid="bal-tag-close"
          onClick={(ev: MouseEvent) => this.balCloseClick.emit(ev)}
          {...this.inheritedAttributesClose}
        ></bal-close>
      </Host>
    )
  }
}
