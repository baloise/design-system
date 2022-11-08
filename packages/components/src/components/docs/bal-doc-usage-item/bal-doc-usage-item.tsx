import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-usage-item',
})
export class DocUsageItem implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() theme: 'do' | 'dont' = 'do'
  @Prop() subject?: string
  @Prop() image?: boolean

  render() {
    const color = this.theme === 'do' ? 'success' : 'danger'
    const icon = this.theme === 'do' ? 'check-circle' : 'alert-circle'
    const title = this.subject ? this.subject : this.theme === 'do' ? 'When to use' : 'When not to use'

    return (
      <Host class="column bal-doc-usage-item">
        <div
          class={{
            'p-normal': true,
            'has-radius-large': true,
            [`has-background-${color}-light`]: true,
          }}
        >
          <h3 class="is-size-large mt-none mb-normal">
            <bal-icon name={icon} inline size="" color={color} class="mr-small"></bal-icon>
            {title}
          </h3>
          {this.image ? (
            <div>
              <slot></slot>
            </div>
          ) : (
            <ul class="is-list ml-large">
              <slot></slot>
            </ul>
          )}
        </div>
      </Host>
    )
  }
}
