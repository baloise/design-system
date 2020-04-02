import {Component, Host, h, Prop} from "@stencil/core";

@Component({
  tag: "bal-navbar",
  styleUrl: "navbar.scss",
})
export class Navbar {

  @Prop() light = false;
  @Prop() logoHref = "https://bulma.io";

  render() {
    return (
      <Host>
        <nav class={[
          "navbar is-spaced bal-track-line",
          this.light ? "" : "is-info",
        ].join(" ")} role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item app-title"
               href={this.logoHref}>
              <slot name="navbar-brand"/>
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu">
            <div class="navbar-start">
              <slot name="navbar-start"/>
            </div>
            <div class="navbar-end">
              <slot name="navbar-end"/>
            </div>
          </div>
        </nav>
      </Host>
    );
  }

}
