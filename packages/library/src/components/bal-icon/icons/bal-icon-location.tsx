import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-location',
  shadow: false,
  scoped: true,
})
export class IconLocation {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M20 10.5C20 8 18 6 15.5 6S11 8 11 10.5c0 2.3 1.8 4.2 4 4.4v8.6c0 .3.2.5.5.5s.5-.2.5-.5v-8.6c2.2-.2 4-2.1 4-4.4zM15.5 14c-1.9 0-3.5-1.6-3.5-3.5S13.6 7 15.5 7 19 8.6 19 10.5 17.4 14 15.5 14z"/><path d="M17.5 11c-.3 0-.5-.2-.5-.5 0-.8-.7-1.5-1.5-1.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c1.4 0 2.5 1.1 2.5 2.5 0 .3-.2.5-.5.5z"/></svg>
    );
  }
}
