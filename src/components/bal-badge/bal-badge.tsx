import {Component, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'bal-badge',
  styleUrl: 'bal-badge.scss',
  shadow: true
})
export class BalBadge {
  /**
   * The theme type of the badge.
   */
  @Prop() type:
    | "is-light"
    | "is-primary"
    | "is-success"
    | "is-warning"
    | "is-danger" = "is-light";

  render() {
    return (
      <Host>
        <span class={`tag ${this.type}`}><slot/></span>
      </Host>
    );
  }

}
