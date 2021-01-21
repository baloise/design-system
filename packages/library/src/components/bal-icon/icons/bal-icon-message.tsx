import { Component, h } from '@stencil/core';

@Component({
  tag: 'bal-icon-message',
  shadow: false,
  scoped: true,
})
export class IconMessage {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27.632 5H2.368C1.105 5 0 6.105 0 7.368v15.79c0 1.263 1.105 2.368 2.368 2.368h25.264c1.263 0 2.368-1.105 2.368-2.368V7.368C30 6.105 28.895 5 27.632 5zM2.368 6.579h25.264c.315 0 .631.158.79.474L15 18.895 1.579 7.053a.868.868 0 01.79-.474zm25.264 17.368H2.368c-.473 0-.789-.315-.789-.79V9.106l12.947 11.527c.158.157.316.157.474.157.158 0 .316 0 .474-.157L28.42 9.105v14.053c0 .474-.316.79-.79.79z"/></svg>
    );
  }
}
