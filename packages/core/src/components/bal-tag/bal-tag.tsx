import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { inheritAttributes } from '../../utils/attributes'

@Component({
  tag: 'bal-tag',
  styleUrl: 'bal-tag.host.scss',
  shadow: true,
})
export class Tag {
  @Element() el!: HTMLStencilElement

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
    const sizeClass = this.size && `is-${this.size}`
    const hasSize = this.size !== undefined

    const hasColor = this.color !== ''
    let colorClass = `is-${this.color}${this.light ? '-light' : ''}`

    if (this.invalid) {
      colorClass = 'is-danger'
    }

    if (this.disabled) {
      colorClass = 'is-grey'
    }

    // const positionClass = `is-${this.position}`
    // const hasPosition = this.position !== undefined

    return (
      <Host>
        <span
          class={{
            tag: true,
            [sizeClass]: hasSize,
            [colorClass]: hasColor,
          }}
          {...this.inheritedAttributes}
        >
          <span data-testid="bal-tag-label">
            <slot />
          </span>
          {this.closable && !this.disabled ? (
            <button
              class="close"
              data-testid="bal-tag-close"
              aria-label="remove tag"
              onClick={(ev: MouseEvent) => this.balCloseClick.emit(ev)}
              {...this.inheritedAttributesClose}
            ></button>
          ) : (
            ''
          )}
        </span>
      </Host>
    )
  }
}
