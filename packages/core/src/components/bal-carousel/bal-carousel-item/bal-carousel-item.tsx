import {
  Component,
  ComponentInterface,
  h,
  Host,
  Method,
  Element,
  Prop,
  Event,
  EventEmitter,
  State,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { rOnLoad, waitAfterFramePaint } from '../../../utils/helpers'
import { Attributes, inheritAttributes } from '../../../utils/attributes'
import { toKebabCase } from '../../../utils/string'

@Component({
  tag: 'bal-carousel-item',
})
export class CarouselItem implements ComponentInterface {
  private imageInheritAttributes: Attributes = {}
  private buttonEl: HTMLButtonElement | HTMLLinkElement

  @Element() el!: HTMLElement

  @State() isLargestContentfulPaintDone = false
  @State() containerId = ''

  /**
   * Src path to the image
   */
  @Prop({ reflect: true }) src?: string

  /**
   * Label of the slide which will be used for pagination tabs
   */
  @Prop({ reflect: true }) label = ''

  /**
   * @deprecated
   * Defines the role of the carousel.
   */
  @Prop() htmlRole: 'tab' | 'listitem' | '' = 'listitem'

  /**
   * The type of button.
   */
  @Prop() elementType: BalProps.BalButtonElementType = 'button'

  /**
   * The name of the button, which is submitted with the form data.
   */
  @Prop({ reflect: true }) name?: string = undefined

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop({ reflect: true }) value?: string | number = undefined

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href?: string

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop() target: BalProps.BalButtonTarget = '_self'

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  @Prop() rel?: string

  /**
   * This attribute instructs browsers to download a URL instead of navigating to
   * it, so the user will be prompted to save it as a local file. If the attribute
   * has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want).
   */
  @Prop() download?: string

  /**
   * Color of the background
   */
  @Prop() color?: BalProps.BalCarouselItemColor

  /**
   * Emitted when the link element has clicked.
   */
  @Event() balNavigate!: EventEmitter<BalEvents.BalCarouselItemNavigateDetail>

  /**
   * Emitted when the button has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalCarouselItemFocusDetail>

  /**
   * Emitted when the button loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalCarouselItemBlurDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    rOnLoad(() => {
      this.isLargestContentfulPaintDone = true
    })
  }

  componentWillLoad() {
    this.imageInheritAttributes = inheritAttributes(this.el, ['alt'])
    this.getContainerId()
  }

  @Method()
  async setFocus(): Promise<void> {
    await waitAfterFramePaint()
    if (this.buttonEl) {
      this.buttonEl.focus()
    }
  }

  async getContainerId(): Promise<void> {
    const parentEl = this.el.closest('bal-carousel') as HTMLBalCarouselElement
    this.containerId = await parentEl.getContainerId()
  }

  private onClick = (ev: MouseEvent) => {
    if (this.href !== undefined) {
      this.balNavigate.emit(ev)
    }
  }

  private onFocus = () => {
    this.balFocus.emit()
  }

  private onBlur = () => {
    this.balBlur.emit()
  }

  render() {
    const block = BEM.block('carousel')
    const itemEl = block.element('item')

    const isProduct = !!this.color && !!this.label

    const parentEl = this.el.closest('bal-carousel') as HTMLBalCarouselElement
    const role = parentEl && parentEl.controls === 'tabs' ? 'tabpanel' : 'listitem'
    const id = `${this.containerId}-${toKebabCase(this.label)}`

    if (!isProduct) {
      return (
        <Host id={id} role={role} class={{ ...itemEl.class() }} aria-label={this.label}>
          {this.isLargestContentfulPaintDone && this.src !== undefined ? (
            <img draggable={false} onDragStart={() => false} src={this.src} {...this.imageInheritAttributes} />
          ) : (
            ''
          )}
          <slot></slot>
        </Host>
      )
    }

    const button = itemEl.element('button')
    const image = button.element('image')
    const label = button.element('label')

    const { elementType, download, href, rel, target, name, value } = this

    const TagType = this.href === undefined ? 'button' : 'a'
    const attrs =
      TagType === 'button'
        ? { type: elementType, name, value }
        : {
            download,
            href,
            rel,
            target,
          }

    return (
      <Host id={id} role={role} aria-label={this.label} class={{ ...itemEl.class() }}>
        <TagType
          {...attrs}
          class={{ ...button.class(), ...button.modifier(`color-${this.color}`).class() }}
          part="native"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.onClick}
          ref={el => (this.buttonEl = el)}
        >
          {this.isLargestContentfulPaintDone && this.src !== undefined ? (
            <img
              class={{ ...image.class() }}
              draggable={false}
              onDragStart={() => false}
              aria-hidden="true"
              src={this.src}
              {...this.imageInheritAttributes}
            />
          ) : (
            ''
          )}
          {this.label !== undefined ? <span class={{ ...label.class() }}>{this.label}</span> : ''}
          <slot></slot>
        </TagType>
      </Host>
    )
  }
}
