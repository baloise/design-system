import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-locate',
  shadow: false,
  scoped: true,
})
export class IconLocate {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M22.7 6.6c-.2-.2-.4-.2-.6-.1l-15.3 8c-.2.1-.3.3-.3.6.1.2.3.4.5.4h6.8v6.8c0 .2.2.4.4.5h.1c.2 0 .4-.1.4-.3l8-15.3c.2-.2.1-.4 0-.6zm-7.9 13.7V15c0-.3-.2-.5-.5-.5H9l12.1-6.3-6.3 12.1z"/></svg>
    );
  }
}
