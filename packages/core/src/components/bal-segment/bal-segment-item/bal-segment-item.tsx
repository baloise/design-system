import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Watch,
  Method,
  EventEmitter,
  Event,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { SegmentValue } from '../bal-segment.types'
import { Attributes, inheritAttributes } from '../../../utils/attributes'
import { addEventListener, raf, removeEventListener } from '../../../utils/helpers'

let SegmentItemIds = 0

@Component({
  tag: 'bal-segment-item',
  styleUrl: 'bal-segment-item.sass',
})
export class SegmentItem implements ComponentInterface {
  private segmentEl: HTMLBalSegmentElement | null = null
  private nativeEl: HTMLButtonElement | undefined
  private inheritedAttributes: Attributes = {}
  private internalId = SegmentItemIds++

  @Element() el!: HTMLElement

  @State() hasSlotContent = false
  @State() isFocusable = false
  @State() isVertical = false
  @State() isLast = false

  /**
   * If `true`, the user cannot interact with the segment button.
   */
  @Prop({ mutable: true }) disabled = false

  /**
   * If `true`, the segment is shown in red.
   */
  @Prop({ mutable: true }) invalid = false

  /**
   * @internal
   * Sets focus state for key navigation
   */
  @Prop({ mutable: true }) focused = false

  /**
   * @internal
   * Sets checked state for key navigation
   */
  @Prop({ mutable: true }) checked = false

  /**
   * Label of the segment control
   */
  @Prop() label = ''

  /**
   * The value of the segment button.
   */
  @Prop({ mutable: true }) value: SegmentValue = 'bal-si-' + this.internalId
  @Watch('value')
  valueChanged(newValue: SegmentValue, oldValue: SegmentValue) {
    if (newValue !== oldValue) {
      this.updateState()
    }
  }

  /**
   * Emitted when the component was touched
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalSegmentBlurDetail>

  componentWillLoad() {
    this.inheritedAttributes = {
      ...inheritAttributes(this.el, ['aria-label']),
    }
  }

  componentDidLoad() {
    const segmentEl = (this.segmentEl = this.el.closest('bal-segment'))
    if (segmentEl) {
      addEventListener(segmentEl, 'balSelect', this.updateState)
      addEventListener(segmentEl, 'balVertical', this.updateVertical)
    }

    raf(() => {
      this.checkSlotContent()
      this.updateState()
    })
  }

  disconnectedCallback() {
    const segmentEl = this.segmentEl
    if (segmentEl) {
      removeEventListener(segmentEl, 'balSelect', this.updateState)
      removeEventListener(segmentEl, 'balVertical', this.updateVertical)
      this.segmentEl = null
    }
  }

  /**
   * @internal
   * Focuses the native <button> element
   * inside of ion-segment-button.
   */
  @Method()
  async setFocus() {
    const { nativeEl } = this

    if (nativeEl !== undefined) {
      nativeEl.focus()
    }
  }

  private updateVertical = (ev: BalEvents.BalSegmentVertical) => {
    this.isVertical = ev.detail
  }

  private updateState = () => {
    const { segmentEl } = this

    if (segmentEl) {
      if (segmentEl.value === '' || segmentEl.value === undefined || segmentEl.value === null) {
        const items = this.allAvailableOptions
        if (items.length > 0) {
          const first = items[0]
          this.isFocusable = first === this.el
        }
      } else {
        this.checked = segmentEl.value === this.value
        this.isFocusable = segmentEl.value === this.value
      }

      if (segmentEl.disabled) {
        this.disabled = true
      }

      this.isLast = segmentEl.lastElementChild === this.el
    }
  }

  private get allAvailableOptions() {
    return this.allOptions.filter(item => !item.disabled)
  }

  private get allOptions() {
    const { segmentEl } = this
    if (segmentEl) {
      return Array.from(segmentEl.querySelectorAll('bal-segment-item'))
    }
    return []
  }

  private checkSlotContent() {
    const slot = this.el.querySelector('[part="slot"]') as HTMLSpanElement
    const children = slot ? slot.innerHTML.trim() : ''
    this.hasSlotContent = children.length > 0
  }

  private onSlottedItemsChange = () => {
    /**
     * When the slotted segment buttons change we need to
     * ensure that the new segment buttons are checked if
     * the value matches the segment button value.
     */
    this.checkSlotContent()
  }

  render() {
    const { checked, focused, segmentEl, label, isFocusable } = this
    const block = BEM.block('segment-item')
    const buttonBem = block.element('button')
    const indicatorBem = block.element('indicator')

    const invalid = this.invalid || (segmentEl && segmentEl.invalid)
    const disabled = this.disabled || (segmentEl && segmentEl.disabled)
    const vertical = this.isVertical

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('vertical').class(vertical),
          ...block.modifier('disabled').class(disabled),
          ...block.modifier('checked').class(checked),
          ...block.modifier('invalid').class(invalid),
          ...block.modifier('last').class(this.isLast && !checked),
        }}
      >
        <button
          role="radio"
          aria-checked={checked ? 'true' : 'false'}
          aria-labelledby={`bal-si-${this.internalId}-label`}
          class={{
            ...buttonBem.class(),
            ...buttonBem.modifier('checked').class(checked),
            ...buttonBem.modifier('invalid').class(invalid),
            ...buttonBem.modifier('disabled').class(disabled),
            ...buttonBem.modifier('focused').class(focused),
            ...buttonBem.modifier('vertical').class(vertical),
          }}
          type={'button'}
          tabIndex={isFocusable && !disabled ? 0 : -1}
          part="native"
          disabled={disabled}
          onBlur={ev => this.balBlur.emit(ev)}
          ref={el => (this.nativeEl = el)}
          {...this.inheritedAttributes}
        >
          <bal-icon
            name="check"
            size="small"
            class={{
              ...buttonBem.element('icon').class(),
              ...buttonBem.element('icon').modifier('animated').class(checked),
              ...buttonBem.element('icon').modifier('vertical').class(vertical),
            }}
            color={disabled ? 'grey-dark' : invalid ? 'white' : 'primary'}
          ></bal-icon>
          <bal-stack space="x-small" layout={'horizontal'}>
            <bal-content space="none">
              <bal-label htmlId={`bal-si-${this.internalId}-label`}>{label}</bal-label>
              <span part="slot" class={{ ...buttonBem.element('slot').modifier('hidden').class(!this.hasSlotContent) }}>
                {' '}
                <slot onSlotchange={this.onSlottedItemsChange}></slot>
              </span>
            </bal-content>
          </bal-stack>
        </button>
        <div
          class={{
            ...indicatorBem.class(),
            ...indicatorBem.modifier('animated').class(),
            ...indicatorBem.modifier('background').class(),
            ...indicatorBem.modifier('disabled').class(disabled),
            ...indicatorBem.modifier('invalid').class(invalid),
            ...indicatorBem.modifier('checked').class(checked),
            ...indicatorBem.modifier('vertical').class(vertical),
          }}
        ></div>
      </Host>
    )
  }
}
