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
            <div class="column is-2 p-2 has-background-blue-light">
              <div class="p-3 is-flex is-align-items-center is-flex-direction-column is-justify-content-center">
                <bal-icon color="primary" name={icon}></bal-icon>
                <span class="mt-1">{icon}</span>
              </div>
            </div>
          ))}
        </div>
      </Host>
    )
  }
}
