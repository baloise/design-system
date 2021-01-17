import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-download',
  shadow: false,
  scoped: true,
})
export class IconDownload {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 19.5c-.1 0-.2 0-.3-.1l-5-4.7c-.1-.1-.2-.4-.1-.5.1-.2.3-.3.5-.3h2V7c0-.3.2-.5.5-.5h5c.2 0 .4.2.4.5v6.8h2c.2 0 .4.1.5.3s0 .4-.1.5l-5 4.7c-.2.2-.3.2-.4.2zm-3.7-4.7l3.7 3.5 3.7-3.5h-1.2c-.3 0-.5-.2-.5-.5V7.5h-4v6.8c0 .3-.2.5-.5.5h-1.2zM24 23.5H6c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5s.5.2.5.5v2.5h17V20c0-.3.2-.5.5-.5s.5.2.5.5v3c0 .3-.2.5-.5.5z"/></svg>
    );
  }
}
