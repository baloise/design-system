import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-alert-circle',
  shadow: false,
  scoped: true,
})
export class IconAlertCircle {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 .5C7 .5.5 7 .5 15S7 29.5 15 29.5 29.5 23 29.5 15 23 .5 15 .5zM16.7 9l-.3 7.7h-1.9L14.1 9h2.6zm-1.3 11.5c-.7 0-1.4-.6-1.4-1.4 0-.7.6-1.4 1.4-1.4s1.4.6 1.4 1.4c-.1.8-.7 1.4-1.4 1.4z"/></svg>
    );
  }
}
