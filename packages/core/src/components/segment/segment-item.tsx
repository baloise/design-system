import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, debounce, ValidateEmptyOrType, setupValidation } from '@utils'

/**
 * Segment item represents an individual selectable option within a segment group control with radio-like toggle behavior.
 *
 * @slot - The segment item label content.
 * @slot helper - The helper or hint text below the item.
 * @part segment-item - The segment item container element.
 * @part native - The native HTML input element.
 */
@Component({
  tag: 'ds-segment-item',
  styleUrl: 'segment-item.host.scss',
  shadow: true,
  formAssociated: true,
})
export class SegmentItem implements DsComponentInterface {
  log!: LogInstance

  @Logger('segment-item')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Description text to display in the segment item.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly description: string = ''

  /**
   * Name of the icon to display in the segment item.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly icon: string = ''

  /**
   * Label text to display in the segment item.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * Svg content for the icon.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly svg: string = ''

  /**
   * A DOMString representing the value of the segment item. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the item's name.
   */
  @Prop({ reflect: true }) readonly value?: any | null

  /**
   * Emitted when a property of the segment item changes, to notify the parent segment to re-render.
   */
  @Event() dsWillUpdate!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
    this.debouncedWillUpdate = debounce(() => this.dsWillUpdate.emit(), 20)
  }

  componentWillUpdate() {
    this.debouncedWillUpdate?.()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private debouncedWillUpdate?: () => void

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return <Host aria-hidden="true"></Host>
  }
}
