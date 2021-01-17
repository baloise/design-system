import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-message',
  shadow: false,
  scoped: true,
})
export class IconMessage {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M23 8.5H7c-.8 0-1.5.7-1.5 1.5v10c0 .8.7 1.5 1.5 1.5h16c.8 0 1.5-.7 1.5-1.5V10c0-.8-.7-1.5-1.5-1.5zm-16 1h16c.2 0 .4.1.5.3L15 17.3 6.5 9.8c.1-.2.3-.3.5-.3zm16 11H7c-.3 0-.5-.2-.5-.5v-8.9l8.2 7.3c.1.1.2.1.3.1s.2 0 .3-.1l8.2-7.3V20c0 .3-.2.5-.5.5z"/></svg>
    );
  }
}
