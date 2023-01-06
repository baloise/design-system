import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-preview',
})
export class DocPreview implements ComponentInterface {
  private slotWrapperEl?: HTMLDivElement
  private previewContentEl?: HTMLDivElement

  @Element() el!: HTMLElement

  componentDidRender() {
    this.updateContent()
  }

  private updateContent() {
    if (this.previewContentEl && this.slotWrapperEl) {
      const content = this.slotWrapperEl.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      console.log('updateContent', content)
      this.previewContentEl.innerHTML = content
    }
  }

  render() {
    return (
      <Host>
        <div class="my-preview-html">
          <div ref={el => (this.previewContentEl = el)}></div>
        </div>

        <div ref={el => (this.slotWrapperEl = el)} style={{ display: 'none' }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
