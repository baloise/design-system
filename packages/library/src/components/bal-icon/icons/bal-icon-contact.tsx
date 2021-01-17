import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-contact',
  shadow: false,
  scoped: true,
})
export class IconContact {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M9.8 24.5c-.1 0-.1 0-.2-.1-.2-.1-.3-.3-.3-.4v-2.8H5c-.3 0-.5-.2-.5-.5V7c0-.3.2-.5.5-.5h20c.3 0 .5.2.5.5v13.7c0 .3-.2.5-.5.5H14.3l-4.2 3.2c-.1.1-.2.1-.3.1zm-4.3-4.3h4.3c.3 0 .5.2.5.5V23l3.5-2.7c.1-.1.2-.1.3-.1h10.4V7.5h-19v12.7z"/><path d="M10.3 14.2c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9-.9.4-.9.9zm4 0c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9-.9.4-.9.9zm4 0c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9-.9.4-.9.9z"/></svg>
    );
  }
}
