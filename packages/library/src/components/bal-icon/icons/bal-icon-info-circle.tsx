import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-info-circle',
  shadow: false,
  scoped: true,
})
export class IconInfoCircle {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 6.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm.8 12.5h-1.5v-5.8h1.5V19zm-.8-6.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg>
    );
  }
}
