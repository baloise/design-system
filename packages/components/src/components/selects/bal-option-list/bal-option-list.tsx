import { Component, h, ComponentInterface, Host, Element, Prop, Watch, State, Method } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { Attributes, inheritAttributes } from '../../../utils/attributes'

@Component({
  tag: 'bal-option-list',
  styleUrls: {
    css: 'bal-option-list.sass',
  },
})
export class OptionList implements ComponentInterface, Loggable {
  private id = `bal-option-list-${balOptionListIds++}`
  private inheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-option-list')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  @Prop({ mutable: true }) focusIndex = -1

  @Prop() contentHeight?: number = 282
  @Watch('contentHeight') contentHeightChanged(value?: number) {
    if (value === undefined) {
      this.el.style.removeProperty('--bal-option-list-max-height')
    } else {
      this.el.style.setProperty('--bal-option-list-max-height', `${value}px`)
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    this.contentHeightChanged(this.contentHeight)
  }

  componentWillRender() {
    this.inheritAttributes = inheritAttributes(this.el, ['aria-multiselectable', 'aria-labelledby'])
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  @Method() async focusFirst(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getFirstOptionIndex(options)
    this.updateFocus(options, indexToFocus)
    return indexToFocus
  }

  @Method() async focusLast(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getLastOptionIndex(options)
    this.updateFocus(options, indexToFocus)
    return indexToFocus
  }

  @Method() async focusNext(): Promise<number> {
    console.log('focusNext', this.options)
    // empty
    return this.focusIndex
  }

  @Method() async focusPrevious(): Promise<number> {
    console.log('focusPrevious', this.options)
    // empty
    return this.focusIndex
  }

  @Method() async scrollToFocusedOption(): Promise<boolean> {
    console.log('scrollToFocusedOption', this.options)
    return true
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get options(): HTMLBalOptionElement[] {
    return Array.from(this.el.querySelectorAll('bal-option'))
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateFocus(options: HTMLBalOptionElement[], indexToFocus: number) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      option.focused = index === indexToFocus
    }
  }

  private getFirstOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (!option.disabled) {
        this.focusIndex = index
        return this.focusIndex
      }
    }
    return this.focusIndex
  }

  private getLastOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = options.length - 1; index >= 0; index--) {
      const option = options[index]
      if (!option.disabled) {
        this.focusIndex = index
        return this.focusIndex
      }
    }
    return this.focusIndex
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('option-list')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.id}
        tabIndex={-1}
        data-testid="bal-option-list"
      >
        <div
          role="listbox"
          class={{
            ...block.element('container').class(),
          }}
          {...this.inheritAttributes}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let balOptionListIds = 0
