import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { AccordionState } from '../../../interfaces'
import { BEM } from '../../../utils/bem'
import { BalConfigObserver, BalConfigState, ListenToConfig } from '../../../utils/config'
import { raf, rIC, transitionEndAsync } from '../../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-list-item',
})
export class ListItem implements ComponentInterface, BalConfigObserver, Loggable {
  static selectors = {
    accordionHead: '.bal-list__item__trigger > bal-list-item-accordion-head',
    accordionBody: '.bal-list__item__trigger > bal-list-item-accordion-body',
    accordionBodyWrapper:
      '.bal-list__item__trigger > .bal-list__item__accordion-body > .bal-list__item__accordion-body__content',
  }

  private currentRaf: number | undefined
  private accordionOpen = false
  private animated = true

  @Element() el!: HTMLStencilElement

  @State() state: AccordionState = AccordionState.Collapsed

  log!: LogInstance

  @Logger('bal-list-item')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the list item can be hovered
   */
  @Prop() disabled = false

  /**
   * If `true` the list item shows that it is clickable
   */
  @Prop() clickable = false

  /**
   * If `true` the list item has a selected theme
   */
  @Prop() selected = false

  /**
   * If `true` the list item can be used as a accordion
   */
  @Prop() accordion = false

  /**
   * If `true` the list item can be used as an accordion inside another accordion
   */
  @Prop() subAccordionItem = false

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href = ''

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel: string | undefined

  /**
   * Specifies where to open the linked document
   */
  @Prop() target: BalProps.BalListItemTarget = '_self'

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download?: string

  /**
   * Emitted when the link element has clicked
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalListItemNavigateDetail>

  /**
   * Emitted when the state of the group is changing
   */
  @Event() balGroupStateChanged!: EventEmitter<BalEvents.BalListItemGroupStateChangedDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalListItemWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalListItemDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    if (this.accordion) {
      this.addEventListenerAccordionChange()
    }
  }

  componentDidLoad() {
    if (this.accordion) {
      rIC(() => {
        this.addEventListenerAccordionChange()
      })
    }
  }

  disconnectedCallback() {
    this.removeEventListenerAccordionChange()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  private accordionChanged = (ev: CustomEvent<boolean>) => {
    const { detail } = ev
    if (detail !== this.accordionOpen) {
      this.accordionOpen = detail
      this.updateState()
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.animated = state.animated
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Opens the accordion
   */
  @Method()
  async present() {
    if (this.accordion && this.accordionOpen === false) {
      this.accordionOpen = true
      this.updateHead()
      this.expandAccordion()
    }
  }

  /**
   * Closes the accordion
   */
  @Method()
  async dismiss(ignoreNested = false) {
    if (this.accordion && this.accordionOpen === true) {
      this.accordionOpen = false
      this.updateHead()
      this.collapseAccordion(false, ignoreNested)
    }
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle() {
    if (this.accordion) {
      if (this.accordionOpen) {
        this.dismiss()
      } else {
        this.present()
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private addEventListenerAccordionChange = () => {
    const accordionHeadEl = this.el.querySelector<any>(ListItem.selectors.accordionHead)
    if (accordionHeadEl) {
      accordionHeadEl.addEventListener('balAccordionChange', this.accordionChanged)

      this.accordionOpen = accordionHeadEl.accordionOpen
      this.updateState(true)
    }
  }

  private removeEventListenerAccordionChange = () => {
    const accordionHeadEl = this.el.querySelector<any>(ListItem.selectors.accordionHead)
    if (accordionHeadEl) {
      accordionHeadEl.removeEventListener('balAccordionChange', this.accordionChanged)
    }
  }

  private updateHead = () => {
    const headEl = this.el.querySelector('bal-list-item-accordion-head')
    if (headEl) {
      headEl.accordionOpen = this.accordionOpen
    }
  }

  private updateState = (initialUpdate = false) => {
    if (this.accordionOpen) {
      this.expandAccordion(initialUpdate)
    } else {
      this.collapseAccordion(initialUpdate)
    }
  }

  private expandAccordion = (initialUpdate = false) => {
    const contentEl = this.el.querySelector<HTMLElement>(ListItem.selectors.accordionBody)
    const contentElWrapper = this.el.querySelector<HTMLElement>(ListItem.selectors.accordionBodyWrapper)

    if (initialUpdate || contentEl === null || contentElWrapper === null) {
      this.state = AccordionState.Expanded
      return
    }

    if (this.state === AccordionState.Expanded) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    const parentListEl = this.el.closest('bal-list')
    if (parentListEl && parentListEl.accordionOneLevel) {
      const items = Array.from(parentListEl.querySelectorAll('bal-list-item')).filter(el => el !== this.el)
      items.forEach(item => item.dismiss(true))
    }

    if (this.shouldAnimate()) {
      raf(() => {
        this.state = AccordionState.Expanding

        this.currentRaf = raf(async () => {
          const contentHeight = contentElWrapper.offsetHeight

          const waitForTransition = transitionEndAsync(contentEl, 300)
          contentEl.style.setProperty('max-height', `${contentHeight}px`)
          this.balWillAnimate.emit(this.accordionOpen)

          await waitForTransition

          this.state = AccordionState.Expanded
          contentEl.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.accordionOpen)
        })
      })
    } else {
      this.balWillAnimate.emit(this.accordionOpen)
      this.state = AccordionState.Expanded
      this.balDidAnimate.emit(this.accordionOpen)
    }
  }

  private collapseAccordion = (initialUpdate = false, ignoreNested = false) => {
    const contentEl = this.el.querySelector<HTMLElement>(ListItem.selectors.accordionBody)

    if (initialUpdate || contentEl === null) {
      this.state = AccordionState.Collapsed
      return
    }

    if (this.state === AccordionState.Collapsed) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (!ignoreNested) {
      const parentListEl = this.el.closest('bal-list')
      if (parentListEl && parentListEl.accordionOneLevel) {
        const items = Array.from(this.el.querySelectorAll('bal-list-item')).filter(el => el !== this.el)
        items.forEach(item => item.dismiss(true))
      }
    }

    if (this.shouldAnimate()) {
      this.currentRaf = raf(async () => {
        const contentHeight = contentEl.offsetHeight
        contentEl.style.setProperty('max-height', `${contentHeight}px`)

        raf(async () => {
          const waitForTransition = transitionEndAsync(contentEl, 300)
          this.state = AccordionState.Collapsing
          this.balWillAnimate.emit(this.accordionOpen)

          await waitForTransition

          this.state = AccordionState.Collapsed
          contentEl.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.accordionOpen)
        })
      })
    } else {
      this.balWillAnimate.emit(this.accordionOpen)
      this.state = AccordionState.Collapsed
      this.balDidAnimate.emit(this.accordionOpen)
    }
  }

  private shouldAnimate = () => {
    if (typeof (window as any) === 'undefined') {
      return false
    }

    return this.animated
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClickTrigger = (ev: MouseEvent) => {
    const accordionBodyEl = this.el.querySelector<any>(ListItem.selectors.accordionBody)
    if (accordionBodyEl) {
      if (!accordionBodyEl.contains(ev.target)) {
        this.balNavigate.emit(ev)
      }
    } else {
      this.balNavigate.emit(ev)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const item = BEM.block('list').element('item')
    const trigger = item.element('trigger')

    const basicClasses = {
      ...item.class(),
      ...item.modifier('disabled').class(this.disabled),
      ...item.modifier('selected').class(this.selected),
      ...item.modifier('animated').class(this.animated),
      ...item.modifier('accordion').class(this.accordion),
      ...item.modifier('sub-accordion').class(this.subAccordionItem),
      ...item.modifier('active').class(this.accordionOpen),
      ...item.modifier('expanding').class(this.state === AccordionState.Expanding),
      ...item.modifier('expanded').class(this.state === AccordionState.Expanded),
      ...item.modifier('collapsing').class(this.state === AccordionState.Collapsing),
      ...item.modifier('collapsed').class(this.state === AccordionState.Collapsed),
      ...item.modifier('clickable').class(!this.disabled && (this.clickable || this.href.length > 0 || this.accordion)),
    }

    if (this.href.length > 0 && !this.disabled) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
        >
          <a
            class={{ ...trigger.class() }}
            rel={this.rel}
            href={this.href}
            target={this.target}
            download={this.download}
            onClick={(ev: MouseEvent) => this.onClickTrigger(ev)}
          >
            <slot></slot>
          </a>
        </Host>
      )
    }

    if (this.clickable) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
        >
          <button
            class={{ ...trigger.class() }}
            disabled={this.disabled}
            onClick={(ev: MouseEvent) => this.onClickTrigger(ev)}
          >
            <slot></slot>
          </button>
        </Host>
      )
    }

    if (this.accordion) {
      return (
        <Host
          role="listitem"
          class={{
            ...basicClasses,
          }}
          onClick={(ev: MouseEvent) => this.onClickTrigger(ev)}
        >
          <div class={{ ...trigger.class() }}>
            <slot></slot>
          </div>
        </Host>
      )
    }

    return (
      <Host
        role="listitem"
        class={{
          ...basicClasses,
        }}
      >
        <div class={{ ...trigger.class() }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
