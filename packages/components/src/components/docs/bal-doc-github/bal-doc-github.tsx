import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-github',
})
export class BalDocGithub {
  @Prop() link = ''

  render() {
    return (
      <Host class="bal-app">
        <section class="mt-8 pt-4 has-border-top-light">
          <p>This page is open source. Noticed a typo? Or something unclear?</p>
          <a
            class="is-link"
            target="_blank"
            href={'https://github.com/baloise/design-system/blob/master/packages/components/src' + this.link}
          >
            Improve this page on GitHub
          </a>
        </section>
      </Host>
    )
  }
}
