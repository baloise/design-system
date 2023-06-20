import { h } from '@stencil/core'
import { NavLinkItem } from './bal-nav-link-item'
import { balBrowser } from '../../../utils/browser'
import { NavLinkItemObserver } from '../bal-nav.types'

export class NavMetaButton extends NavLinkItem implements BalProps.BalNavMetaButton {
  touchPlacement: 'top' | 'bottom' | 'none' = 'top'

  popoverId?: string
  icon?: string
  ariaLabel?: string
  htmlTitle?: string
  id = `nav-meta-button-${NavMetaButtonIDs++}`

  constructor(item: BalProps.BalNavMetaButton, observer: NavLinkItemObserver) {
    super(item, observer)
    this.touchPlacement = item.touchPlacement || 'top'
    this.value = item.value || this.id
    this.icon = item.icon
    this.popoverId = item.popupId
    this.ariaLabel = item.ariaLabel
    this.htmlTitle = item.htmlTitle
  }

  renderAtMetaBar() {
    return (
      <bal-button
        id={this.value}
        class="bal-popup-permanent-trigger bal-nav__popup--desktop"
        color="light"
        size="small"
        icon={this.icon}
        square={!this.label || this.label.length < 3}
        aria-label={this.ariaLabel}
        title={this.htmlTitle}
        inverted={true}
        bal-popup={this.popoverId}
        bal-popup-variant="popover"
        bal-popup-placement="bottom-end"
        bal-popup-arrow="true"
        bal-popup-backdrop="true"
        bal-popup-closable="true"
      >
        {this.label}
      </bal-button>
    )
  }

  renderAtTouchTopMetaBar() {
    if (this.touchPlacement === 'top') {
      return (
        <bal-button
          id={this.value}
          class="bal-nav__popup--touch-top"
          color="light"
          icon={this.icon}
          square={!!this.icon || !this.label || this.label.length < 3}
          inverted={false}
          aria-label={this.ariaLabel}
          title={this.htmlTitle}
          bal-popup={this.popoverId}
          bal-popup-variant="fullscreen"
          bal-popup-closable="true"
          bal-popup-offset="64"
        >
          {this.icon ? '' : this.label}
        </bal-button>
      )
    }
  }

  renderAtTouchBottomMetaBar() {
    if (this.touchPlacement === 'bottom') {
      return (
        <bal-button
          id={this.value}
          class="bal-nav__popup--touch-bottom"
          icon={this.icon}
          square={!this.label || this.label.length < 3}
          color="info"
          inverted={false}
          aria-label={this.ariaLabel}
          title={this.htmlTitle}
          bal-popup={this.popoverId}
          bal-popup-variant="drawer"
          bal-popup-closable="true"
          bal-popup-backdrop="true"
          bal-popup-offset="64"
        >
          {this.label}
        </bal-button>
      )
    }
  }

  resetTouchBottomMetaBar() {
    if (balBrowser.hasDocument && this.touchPlacement === 'bottom') {
      const button = document.getElementById(this.value) as HTMLBalButtonElement | null
      console.log(button)
      if (button && (button as any).balPopupVariant === 'drawer') {
        button.color = 'info'
      }
    }
  }

  resetDesktopMetaBar() {
    if (balBrowser.hasDocument) {
      const button = document.getElementById(this.value) as HTMLBalButtonElement | null
      console.log(button)
      if (button && (button as any).balPopupVariant === 'popover') {
        button.color = 'info'
      }
    }
  }
}

let NavMetaButtonIDs = 0
