import {
  AttachInternals,
  Component,
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
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import {
  Logger,
  type LogInstance,
  isSpaceKey,
  inheritAttributes,
  debounce,
  isDescendant,
  waitAfterIdleCallback,
  stopEventBubbling,
} from '@utils'
import { FOCUS_KEYS } from '../app/app.focus.util'

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
  @Prop() readonly svg: string = ''

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
