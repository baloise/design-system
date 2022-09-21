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
          <p class="mb-3">
            If you experience any issues while using a component, please head over to the{' '}
            <a href="https://design-system-next.vercel.app/?path=/docs/support--page">Support page</a> for more
            guidelines and help.
          </p>
          <p>This page is open source. Noticed a typo? Or something unclear?</p>
          <a
            class="is-link"
            target="_blank"
            href={'https://github.com/baloise-incubator/design-system/blob/master/packages/components/src' + this.link}
          >
            Improve this page on GitHub
          </a>
        </section>
      </Host>
    )
  }
}
