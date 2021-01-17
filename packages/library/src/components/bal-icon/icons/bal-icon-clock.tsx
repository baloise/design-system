import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-clock',
  shadow: false,
  scoped: true,
})
export class IconClock {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 24.5c-5.2 0-9.5-4.3-9.5-9.5S9.8 5.5 15 5.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5zm0-18c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5z"/><path d="M19 19.6c-.1 0-.2 0-.3-.1l-4-3.6c-.1-.1-.2-.2-.2-.4V11c0-.3.2-.5.5-.5s.5.2.5.5v4.3l3.9 3.4c.2.2.2.5 0 .7-.1.1-.2.2-.4.2z"/></svg>
    );
  }
}
