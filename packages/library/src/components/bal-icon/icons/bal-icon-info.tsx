import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-info',
  shadow: false,
  scoped: true,
})
export class IconInfo {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 11.5c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9zm-.8 6.5h1.5v-5.8h-1.5V18z"/></svg>
    );
  }
}
