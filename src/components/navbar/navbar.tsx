import {Component, Host, h, Prop} from "@stencil/core";

@Component({
  tag: "bal-navbar",
  styleUrl: "navbar.scss",
})
export class Navbar {

  @Prop() light = false;
  @Prop() logoSrc = "docs/assets/logo-dark.png";
  @Prop() logoHref = "https://bulma.io";
  @Prop() logoAlt = "";

  render() {
    return (
      <Host>
        <nav class={[
          "navbar is-spaced bal-track-line",
          this.light ? "" : "is-info",
        ].join(" ")} role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item"
               href={this.logoHref}>
              <img src={this.logoSrc}
                   alt={this.logoAlt}/>
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu">
            <div class="navbar-start">
              <slot name="header-start" />
            </div>
            <div class="navbar-end">
              <slot name="header-end" />
            </div>
          </div>
        </nav>
      </Host>
    );
  }

}
