import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-copy',
  shadow: false,
  scoped: true,
})
export class IconCopy {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M22 6.5H9c-.3 0-.5.2-.5.5v17c0 .3.2.5.5.5h7c.2 0 .4-.1.4-.3l5.9-5.8c.1-.1.1-.2.1-.4V7c.1-.3-.1-.5-.4-.5zm-12.5 1h12v10H16c-.3 0-.5.2-.5.5v5.5h-6v-16zm11.3 11l-4.3 4.3v-4.3h4.3z"/><path d="M14 14v-2h2v-1h-2V9h-1v2h-2v1h2v2z"/></svg>
    );
  }
}
