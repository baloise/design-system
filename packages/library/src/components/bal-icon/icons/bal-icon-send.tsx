import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-icon-send',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class IconSend {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [`is-size-${this.size}`]: !!this.size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 17"><g fill-rule="nonzero"><path d="M8.69 11.5v1H2.214C1.271 12.5.5 11.752.5 10.821V2.18C.5 1.249 1.271.5 2.214.5h14.572c.943 0 1.714.748 1.714 1.679V6.5h-1V2.179c0-.371-.317-.679-.714-.679H2.214c-.397 0-.714.308-.714.679v8.642c0 .371.317.679.714.679H8.69z"/><path d="M15.767 7.555l5.368 4.586-5.382 4.575v-2.328h-4.889V9.893h4.892l.011-2.338zm3.826 4.584l-2.837-2.424-.006 1.178h-4.886v2.495h4.889v1.166l2.84-2.415zM10 8.336l7.67-6.712.66.752L10 9.664 1.67 2.376l.66-.752z"/></g></svg>
      </Host>
    );
  }
}
