import { Component, h, ComponentInterface, Host, Prop, Method, Element } from '@stencil/core'
import { scrollToFirstInvalidField } from '../../utils/form'
import { waitAfterFramePaint, waitAfterIdleCallback } from '../../utils/helpers'

@Component({
  tag: 'bal-form',
  styleUrl: 'bal-form.sass',
})
export class Form implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * If `true` a native form element is added as a wrapper of the slot.
   */
  @Prop() native = false

  /**
   * If `true` it adds the novalidate attribute to the native form element.
   */
  @Prop() novalidate = false

  /**
   * The css class for the inner form element
   */
  @Prop() formClass = ''

  /**
   * Scrolls to the first invalid field inside this form component.
   */
  @Method()
  async scrollToFirstInvalidField(): Promise<void> {
    await waitAfterIdleCallback()
    await waitAfterFramePaint()
    scrollToFirstInvalidField({ formEl: this.el })
  }

  render() {
    const NativeEl = this.native ? 'form' : 'div'

    let attrs = {}
    if (this.native) {
      attrs = {
        novalidate: this.novalidate,
      }
    }

    return (
      <Host>
        <NativeEl {...attrs} class={this.formClass}>
          <slot></slot>
        </NativeEl>
      </Host>
    )
  }
}
