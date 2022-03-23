import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-link-list-item',
  styleUrl: 'bal-doc-link-list-item.scss',
})
export class DocLinkListItem implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() image = ''
  @Prop() subject = ''
  @Prop() template: '' | 'html5' | 'angular' | 'vue' | 'react' = ''

  render() {
    let { subject, image } = this

    if (this.template === 'html5') {
      subject = 'HTML5'
      image =
        'https://raw.githubusercontent.com/baloise/design-system/master/packages/components/src/stories/assets/images/html.png'
    }

    if (this.template === 'angular') {
      subject = 'Angular'
      image =
        'https://raw.githubusercontent.com/baloise/design-system/master/packages/components/src/stories/assets/images/angular.svg'
    }

    if (this.template === 'vue') {
      subject = 'Vue'
      image =
        'https://raw.githubusercontent.com/baloise/design-system/master/packages/components/src/stories/assets/images/vue.png'
    }

    if (this.template === 'react') {
      subject = 'React'
      image =
        'https://raw.githubusercontent.com/baloise/design-system/master/packages/components/src/stories/assets/images/react.svg'
    }

    return (
      <Host>
        <img src={image} alt={subject} />
        <span>
          <strong>{subject}</strong>
          <slot></slot>
        </span>
      </Host>
    )
  }
}
