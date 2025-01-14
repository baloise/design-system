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
  writeTask,
  Listen,
  Method,
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
  isEnterKey,
} from '../../utils/keyboard'
import { stopEventBubbling } from '../../utils/form-input'
import { FOCUS_KEYS } from '../../utils/focus-visible'
import { ListenToWindowResize, BalWindowResizeObserver } from '../../utils/resize'
import { isDescendant, raf } from '../../utils/helpers'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints } from '../../utils/breakpoints'
import { BalFocusObserver, ListenToFocus } from '../../utils/focus'
import { defaultBalAriaForm, BalAriaForm } from '../../utils/form'
import { BalVisibilityObserver, ListenToVisibility } from '../../utils/visibility'
import { BalAnimationObserver, ListenToAnimation } from '../../utils/animation'

@Component({
  tag: 'bal-segment',
  styleUrl: 'bal-segment.sass',
})
export class Segment
  implements
    ComponentInterface,
    BalWindowResizeObserver,
    BalBreakpointObserver,
    BalFocusObserver,
    BalVisibilityObserver,
    BalAnimationObserver
{
  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-segment')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() focusedValue?: SegmentValue
  @State() keyboardMode = true
  @State() isVertical = false
  @State() isMobile = false
  @State() maxWidth = 0
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

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
  @Watch('disabled')
  protected disabledChanged() {
    this.allItems.map(item => (item.disabled = this.disabled))
  }

  /**
   * If `true`, the segment items are presented vertical as a list.
   */
  @Prop() vertical = false

  /**
   * If `true`, and is vertical then the list height is limited and scrollable.
   */
  @Prop() scrollable = false

  /**
   * If `true`, the element uses the whole width
   */
  @Prop() expanded = false

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
   * Emitted when the toggle has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalSegmentFocusDetail>

  /**
   * Emitted when the component was touched
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalSegmentBlurDetail>

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
   * Emitted when the vertical style changes
   *
   * @internal
   */
  @Event() balVertical!: EventEmitter<BalEvents.BalSegmentVerticalDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.el.addEventListener('touchstart', this.onPointerDown)
    this.el.addEventListener('mousedown', this.onPointerDown)
    this.disabledChanged()
    this.isVertical = this.vertical
  }

  disconnectedCallback() {
    this.el.removeEventListener('touchstart', this.onPointerDown)
    this.el.removeEventListener('mousedown', this.onPointerDown)
  }

  async componentDidLoad() {
    this.setCheckedClasses()
    this.defineWidth()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  hasFocus = false

  @ListenToFocus()
  focusInListener(ev: FocusEvent): void {
    this.balFocus.emit(ev)
  }

  @ListenToFocus()
  focusOutListener(ev: FocusEvent): void {
    this.balBlur.emit(ev)
  }

  @ListenToAnimation()
  animationListener(): void {
    const childRect = this.el.getBoundingClientRect()
    this.maxWidth = childRect.width
    this.windowResizeListener()
  }

  @ListenToVisibility()
  visibilityListener(): void {
    const childRect = this.el.getBoundingClientRect()
    this.maxWidth = childRect.width
    this.windowResizeListener()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
  }

  @ListenToWindowResize()
  windowResizeListener(): void {
    if (this.vertical === false && this.maxWidth > 0) {
      const parent = this.el.parentElement.getBoundingClientRect()

      if (parent.width < this.maxWidth) {
        //
        // element in horizontal is to big
        this.emitVerticalChange(true)
      } else {
        //
        // element has enough space in parent element
        this.emitVerticalChange(false)
      }
    } else {
      this.emitVerticalChange(true)
    }
  }

  @Listen('keydown', { target: 'document' })
  listenOnKeyDownOutside() {
    this.keyboardMode = true
  }

  @Listen('keydown')
  listenOnKeyDown(ev: KeyboardEvent) {
    this.keyboardMode = FOCUS_KEYS.includes(ev.key)
    let forceChange = false

    let current: undefined | HTMLBalSegmentItemElement

    if (isSpaceKey(ev) || isEnterKey(ev)) {
      stopEventBubbling(ev)
      current = this.getSegmentItem('current')
      forceChange = this.value !== current.value
      this.value = current.value
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
    if (current !== previous || forceChange) {
      this.checkButton(previous, current)
      this.emitValueChange()
    }

    if (current) {
      current.setFocus()
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get allItems() {
    return Array.from(this.el.querySelectorAll('bal-segment-item'))
  }

  private get checked() {
    return this.allItems.find(item => item.value === this.value)
  }

  private getSegmentItem = (
    selector: 'first' | 'last' | 'next' | 'previous' | 'current',
  ): HTMLBalSegmentItemElement | null => {
    const items = this.allItems.filter(item => !item.disabled)
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

  private emitVerticalChange(isVertical: boolean) {
    if (this.isVertical !== isVertical) {
      this.isVertical = isVertical
      this.balVertical.emit(this.isVertical)
    }
  }

  private defineWidth() {
    raf(() => {
      if (this.isVertical === false) {
        const childRect = this.el.getBoundingClientRect()
        this.maxWidth = childRect.width
      }
      this.windowResizeListener()
    })
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
    this.defineWidth()
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

    if (current && current.setFocus) {
      current.setFocus()
    }

    if (previous) {
      this.checkButton(previous, current)
    } else {
      this.setCheckedClasses()
      this.checkButton(current, current)
    }

    if (current !== previous) {
      this.emitValueChange()
    }
  }

  private getIndicator(item: HTMLBalSegmentItemElement): HTMLDivElement | null {
    if (item) {
      const root = item.shadowRoot || item
      return root.querySelector('.bal-segment-item__indicator')
    }
    return null
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

    if (this.isVertical) {
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
    const items = this.allItems
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
    const { invalid, isVertical, scrollable, keyboardMode, expanded, isMobile, disabled } = this
    const block = BEM.block('segment')

    return (
      <Host
        role="radiogroup"
        id={this.ariaForm.controlId}
        aria-labelledby={this.ariaForm.labelId}
        aria-describedby={this.ariaForm.messageId}
        class={{
          ...block.class(),
          ...block.modifier('invalid').class(invalid),
          ...block.modifier('vertical').class(isVertical),
          ...block.modifier('scrollable').class(scrollable),
          ...block.modifier('keyboard').class(keyboardMode),
          ...block.modifier('disabled').class(disabled),
          ...block.modifier('expanded').class((expanded || isMobile) && !isVertical),
        }}
        onClick={this.onClick}
      >
        <slot onSlotchange={this.onSlottedItemsChange}></slot>
      </Host>
    )
  }
}
