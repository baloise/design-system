import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-trash',
  shadow: false,
  scoped: true,
})
export class IconTrash {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M13 13.5c-.3 0-.5.2-.5.5v6c0 .3.2.5.5.5s.5-.2.5-.5v-6c0-.3-.2-.5-.5-.5zM15 13.5c-.3 0-.5.2-.5.5v6c0 .3.2.5.5.5s.5-.2.5-.5v-6c0-.3-.2-.5-.5-.5zM17 13.5c-.3 0-.5.2-.5.5v6c0 .3.2.5.5.5s.5-.2.5-.5v-6c0-.3-.2-.5-.5-.5z"/><path d="M23 9.5h-4.5V8c0-.3-.2-.5-.5-.5h-6c-.3 0-.5.2-.5.5v1.5H7c-.3 0-.5.2-.5.5s.2.5.5.5h2.5V23c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V10.5H23c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zm-10.5-1h5v1h-5v-1zm7 14h-9v-12h9v12z"/></svg>
    );
  }
}
