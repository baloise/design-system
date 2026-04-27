import {
  AttachInternals,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { isSpaceKey } from '../../utils/keyboard'
import { FOCUS_KEYS } from '../../utils/focus-visible'
import { inheritAttributes } from '../../utils/attributes'
import { debounce, isDescendant, waitAfterIdleCallback } from '../../utils/helpers'
import { stopEventBubbling } from '../../utils/form-control'

@Component({
  tag: 'ds-segment-item',
  styleUrl: 'segment-item.host.scss',
  shadow: true,
  formAssociated: true,
})
export class SegmentItem implements ComponentInterface {
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * A DOMString representing the value of the segment item. This is not displayed on the
   * client-side, but on the server this is the value given to the data
   * submitted with the item's name.
   */
  @Prop({ reflect: true }) readonly value?: any | null

  /**
   * Name of the icon to display in the segment item.
   */
  @Prop({ reflect: true }) readonly icon = ''

  /**
   * Svg content for the icon.
   */
  @Prop() readonly svg?: string

  /**
   * Label text to display in the segment item.
   */
  @Prop({ reflect: true }) readonly label = ''

  /**
   * Description text to display in the segment item.
   */
  @Prop({ reflect: true }) readonly description = ''

  debouncedWillUpdate?: () => void
  @Event() dsWillUpdate!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.debouncedWillUpdate = debounce(() => this.dsWillUpdate.emit(), 20)
  }

  componentWillUpdate() {
    this.debouncedWillUpdate?.()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return <Host aria-hidden="true"></Host>
  }
}
