import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-check-circle',
  shadow: false,
  scoped: true,
})
export class IconCheckCircle {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0C6.783 0 0 6.783 0 15c0 8.217 6.783 15 15 15 8.217 0 15-6.783 15-15 0-8.217-6.783-15-15-15zm-2.087 20.74L8.87 16.564l1.826-1.826 2.217 2.217 6.652-6.912 1.826 1.826-8.478 8.87z"/></svg>
    );
  }
}
