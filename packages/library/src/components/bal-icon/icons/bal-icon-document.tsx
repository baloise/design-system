import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-document',
  shadow: false,
  scoped: true,
})
export class IconDocument {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M22.4 11.6l-5.9-5.8c-.1-.2-.2-.3-.4-.3H9c-.3 0-.5.2-.5.5v17c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V11.9c0-.1-.1-.2-.1-.3zm-5.9-4.4l4.3 4.3h-4.3V7.2zm-7 15.3v-16h6V12c0 .3.2.5.5.5h5.5v10h-12z"/></svg>
    );
  }
}
