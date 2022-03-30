import { Component, h, ComponentInterface, Host, Element, Listen } from '@stencil/core'

@Component({
  tag: 'bal-doc-tabs',
  styleUrl: 'bal-doc-tabs.scss',
})
export class DocTabs implements ComponentInterface {
  @Element() el!: HTMLElement

  @Listen('hashchange', { target: 'window' })
  routeChanged() {
    this.updateIsActive()
  }

  componentDidLoad() {
    const linkElements = this.el.querySelectorAll('a')
    linkElements[0].classList.add('is-active')
  }

  updateIsActive() {
    const linkElements = this.el.querySelectorAll('a')
    linkElements.forEach(link => {
      if (link.href.includes(location.hash)) {
        link.classList.add('is-active')
      } else {
        link.classList.remove('is-active')
      }
    })
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
