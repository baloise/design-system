import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Event,
  EventEmitter,
  Watch,
  State,
  Listen,
  writeTask,
} from '@stencil/core'
import { BEM } from '../../utils/bem'
import { SegmentValue } from './bal-segment.types'
import { Logger, LogInstance } from '../../utils/log'
import {
  isArrowDownKey,
  isArrowUpKey,
  isSpaceKey,
  isHomeKey,
  isEndKey,
  isArrowLeftKey,
  isArrowRightKey,
} from '@baloise/web-app-utils'
import { stopEventBubbling } from '../../utils/form-input'
import { FOCUS_KEYS, startFocusVisible } from '../../utils/focus-visible'

@Component({
  tag: 'bal-segment',
  styleUrl: 'bal-segment.sass',
})
export class Segment implements ComponentInterface {
  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-segment')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() focusedValue?: SegmentValue
  @State() keyboardMode = true

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true`, the segment is shown red.
   */
  @Prop() invalid = false

  /**
   * If `true`, the user cannot interact with the segment.
   */
  @Prop() disabled = false

  /**
   * If `true`, the segment items are presented vertical as a list.
   */
  @Prop() vertical = false

  /**
   * If `true`, and is vertical then the list height is limited and scrollable.
   */
  @Prop() scrollable = false

  /**
   * the value of the segment.
   */
  @Prop({ mutable: true }) value?: BalProps.BalSegmentValue
  @Watch('value')
  protected valueChanged(value: BalProps.BalSegmentValue | undefined) {
    /**
     * `balSelect` is emitted every time the value changes (internal or external changes).
     * Used by `bal-segment-item` to determine if the button should be checked.
     */
    this.balSelect.emit(value)
  }

  /**
   * Emitted when the value property has changed and any dragging pointer has been released from `bal-segment`.
   *
   * This event will not emit when programmatically setting the `value` property.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalSegmentChangeDetail>

  /**
   * Emitted when the value of the segment changes from user committed actions
   * or from externally assigning a value.
   *
   * @internal
   */
  @Event() balSelect!: EventEmitter<BalEvents.BalSegmentChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
  }

  disconnectedCallback() {
    this.el.removeEventListener('touchstart', this.onPointerDown)
    this.el.removeEventListener('mousedown', this.onPointerDown)
  }

  async componentDidLoad() {
    this.setCheckedClasses()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('keydown')
  listenOnKeyDown(ev: KeyboardEvent) {
    this.keyboardMode = FOCUS_KEYS.includes(ev.key)

    let current: undefined | HTMLBalSegmentItemElement

    if (isSpaceKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('current')
    } else if (isArrowUpKey(ev) || isArrowLeftKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('previous')
    } else if (isArrowDownKey(ev) || isArrowRightKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('next')
    } else if (isHomeKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('first')
    } else if (isEndKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('last')
    }

    if (!current) {
      return
    }

    const previous = this.checked
    if (current !== previous) {
      this.checkButton(previous, current)
      this.emitValueChange()
    }

    current.setFocus()
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get items() {
    return Array.from(this.el.querySelectorAll('bal-segment-item'))
  }

  private get checked() {
    return this.items.find(item => item.value === this.value)
  }

  private getSegmentItem = (
    selector: 'first' | 'last' | 'next' | 'previous' | 'current',
  ): HTMLBalSegmentItemElement | null => {
    const items = this.items.filter(item => !item.disabled)
    const currIndex = items.findIndex(item => item === document.activeElement.closest('bal-segment-item'))

    switch (selector) {
      case 'current':
        return items[currIndex]
      case 'first':
        return items[0]
      case 'last':
        return items[items.length - 1]
      case 'next':
        return items[currIndex + 1] ?? items[0]
      case 'previous':
        return items[currIndex - 1] ?? items[items.length - 1]
      default:
        return null
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private emitValueChange() {
    this.balChange.emit(this.value)
  }

  /**
   * PRIVATE EVENT HANDLERS
   * ------------------------------------------------------
   */

  private onPointerDown = () => {
    this.keyboardMode = false
  }

  private onSlottedItemsChange = () => {
    /**
     * When the slotted segment buttons change we need to
     * ensure that the new segment buttons are checked if
     * the value matches the segment button value.
     */
    this.valueChanged(this.value)
  }

  private onClick = (ev: Event) => {
    if (this.disabled) {
      return
    }

    const current = ev.target as HTMLBalSegmentItemElement
    const previous = this.checked

    // If the current element is a segment then that means
    // the user tried to swipe to a segment button and
    // click a segment button at the same time so we should
    // not update the checked segment button
    if (current.tagName === 'BAL-SEGMENT') {
      return
    }

    current.setFocus()

    if (current !== previous) {
      this.emitValueChange()
    }

    if (previous) {
      this.checkButton(previous, current)
    } else {
      this.setCheckedClasses()
    }
  }

  private getIndicator(item: HTMLBalSegmentItemElement): HTMLDivElement | null {
    const root = item.shadowRoot || item
    return root.querySelector('.bal-segment-item__indicator')
  }

  private checkButton(previous: HTMLBalSegmentItemElement, current: HTMLBalSegmentItemElement) {
    const previousIndicator = this.getIndicator(previous)
    const currentIndicator = this.getIndicator(current)

    if (previousIndicator === null || currentIndicator === null) {
      return
    }

    const previousClientRect = previousIndicator.getBoundingClientRect()
    const currentClientRect = currentIndicator.getBoundingClientRect()

    const widthDelta = previousClientRect.width / currentClientRect.width
    const xPosition = previousClientRect.left - currentClientRect.left

    // Scale the indicator width to match the previous indicator width
    // and translate it on top of the previous indicator
    let transform = `translate3d(${xPosition}px, 0, 0) scaleX(${widthDelta})`

    if (this.vertical) {
      const heightDelta = previousClientRect.height / currentClientRect.height
      const yPosition = previousClientRect.top - currentClientRect.top

      // Scale the indicator width to match the previous indicator width
      // and translate it on top of the previous indicator
      transform = `translate3d(0, ${yPosition}px, 0) scaleY(${heightDelta})`
    }

    writeTask(() => {
      // Remove the transition before positioning on top of the previous indicator
      currentIndicator.classList.remove('bal-segment-item__indicator--animated')
      currentIndicator.style.setProperty('transform', transform)

      // Force a repaint to ensure the transform happens
      currentIndicator.getBoundingClientRect()

      // Add the transition to move the indicator into place
      currentIndicator.classList.add('bal-segment-item__indicator--animated')

      // Remove the transform to slide the indicator back to the button clicked
      currentIndicator.style.setProperty('transform', '')
    })

    this.value = current.value
    this.setCheckedClasses()
  }

  private setCheckedClasses() {
    const items = this.items
    const index = items.findIndex(item => item.value === this.value)
    const next = index + 1
    const previous = index - 1

    for (const item of items) {
      item.classList.remove('bal-segment-item--after-checked')
      item.classList.remove('bal-segment-item--before-checked')
    }
    if (next < items.length) {
      items[next].classList.add('bal-segment-item--after-checked')
    }
    if (previous < items.length && previous >= 0) {
      items[previous].classList.add('bal-segment-item--before-checked')
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const { invalid, vertical, scrollable, keyboardMode } = this
    const block = BEM.block('segment')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('invalid').class(invalid),
          ...block.modifier('vertical').class(vertical),
          ...block.modifier('scrollable').class(scrollable),
          ...block.modifier('keyboard').class(keyboardMode),
        }}
        onClick={this.onClick}
      >
        <slot onSlotchange={this.onSlottedItemsChange}></slot>
      </Host>
    )
  }
}
