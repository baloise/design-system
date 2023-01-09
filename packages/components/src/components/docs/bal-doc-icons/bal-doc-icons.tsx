import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-doc-icons',
})
export class BalDocIcons {
  @Prop() icons = ''

  render() {
    return (
      <Host class="bal-app">
        <div class="columns is-multiline">
          {this.icons.split(',').map(icon => (
            <div class="column is-3 p-x-small has-background-blue-light">
              <div class="p-small has-text-center is-flex is-align-items-center is-flex-direction-column is-justify-content-center">
                <bal-icon color="primary" name={icon}></bal-icon>
                <span class="mt-xx-small">{icon}</span>
              </div>
            </div>
          ))}
        </div>
      </Host>
    )
  }
}
