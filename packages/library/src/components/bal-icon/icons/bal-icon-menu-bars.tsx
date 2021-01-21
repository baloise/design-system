import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-menu-bars',
  shadow: false,
  scoped: true,
})
export class IconMenuBars {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M0 13.333h30v3.334H0v-3.334zm0 8.334h30V25H0v-3.333zM0 5h30v3.333H0V5z"/></svg>
    );
  }
}
