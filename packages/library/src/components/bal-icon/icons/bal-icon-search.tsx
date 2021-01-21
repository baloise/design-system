import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-search',
  shadow: false,
  scoped: true,
})
export class IconSearch {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g clip-path="url(#clip0)"><path d="M29.42 26.516l-9.291-9.29c1.161-1.742 1.935-3.871 1.935-6.194 0-6-4.838-11.032-11.032-11.032C5.032 0 0 4.839 0 11.032c0 6 4.839 11.032 11.032 11.032 2.323 0 4.452-.774 6.194-1.935l9.29 9.29c.387.387.968.581 1.355.581s.968-.194 1.355-.58c.968-.968.968-2.13.193-2.904zM4.064 11.032c0-3.87 3.096-7.161 7.16-7.161 3.872 0 7.162 3.097 7.162 7.161 0 3.871-3.097 7.162-7.161 7.162-4.065-.194-7.161-3.29-7.161-7.162z"/></g><defs><clipPath id="clip0"><path d="M0 0h30v30H0z"/></clipPath></defs></svg>
    );
  }
}
