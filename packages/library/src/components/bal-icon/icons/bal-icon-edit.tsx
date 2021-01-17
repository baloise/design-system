import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-edit',
  shadow: false,
  scoped: true,
})
export class IconEdit {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M22.6 10l-2.8-2.8c-.2-.2-.5-.2-.7 0L17.3 9l-7 7s-.1.1-.1.2L8 21.1c-.1.2 0 .4.1.6.1.1.2.1.4.1h.2l4.9-2.1c.1 0 .1-.1.2-.1l8.8-8.8c.2-.3.2-.6 0-.8zm-9.2 8.5l-2.1-2.1 6.3-6.3 2.1 2.1-6.3 6.3zm-2.6-1.3l1.8 1.8-3.1 1.3 1.3-3.1zm9.7-5.7l-2.1-2.1 1.1-1.1 2.1 2.1-1.1 1.1z"/></svg>
    );
  }
}
