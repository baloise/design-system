import { Component, Host, h, Prop, Watch, Element } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-list',
  styleUrls: {
    css: 'bal-list.sass',
  },
})
export class List {
  @Element() el!: HTMLElement

  /**
   * If `true` the list item can not be hovered
   */
  @Prop() disabled = false

  /**
   * @deprecated
   * If `true` the list can be used on a dark background
   */
  @Prop() inverted = undefined
  @Watch('inverted')
  invertedHandler() {
    if (this.inverted !== undefined) {
      console.warn('[DEPRECATED] - Please use the property background="dark" instead of inverted')
      if (this.inverted === true) {
        this.background = 'dark'
      } else {
        this.background = 'light'
      }
    }
  }

  /**
   * If `true` the list can be used on a light, dark or colored backgrounds
   */
  @Prop() background: BalProps.BalListBackground = 'light'

  /**
   * If `true` each list item has a bottom border
   */
  @Prop() border = false

  /**
   * If `true` only one of the layers can be open and the others close automatically
   */
  @Prop() accordionOneLevel = false
  @Watch('accordionOneLevel')
  accordionOneLevelHandler(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      const allNestedLists = Array.from(this.el.querySelectorAll('bal-list'))
      allNestedLists.forEach(list => (list.accordionOneLevel = newValue))
    }
  }

  /**
   * Defines the min height of the list item
   */
  @Prop() size: BalProps.BalListSize = ''

  // /**
  //  * If `true` the list can be used as an accordion in meta nav
  //  */
  // @Prop() inMainNav = false

  componentWillLoad() {
    this.invertedHandler()
    this.accordionOneLevelHandler(this.accordionOneLevel, false)
  }

  render() {
    const block = BEM.block('list')

    const closestListEl = this.el.closest('.bal-list')
    const nested = closestListEl !== null && closestListEl !== this.el

    return (
      <Host
        role="list"
        class={{
          ...block.class(),
          ...block.modifier('nested').class(nested),
          ...block.modifier('disabled').class(this.disabled),
          ...block.modifier('border').class(this.border),
          ...block.modifier(`size-${this.size}`).class(this.size !== ''),
          ...block.modifier(`background-${this.background}`).class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
