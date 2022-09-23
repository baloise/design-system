import { Component, h, Host, Prop } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-sheet',
})
export class Sheet {
  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: Props.BalSheetContainer = ''

  render() {
    const block = BEM.block('sheet')
    const container = block.element('container')
    const containerInner = container.element('inner')

    const containerModifier = this.containerSize !== '' ? `is-${this.containerSize}` : ''

    return (
      <Host class={{ ...block.class() }}>
        <div
          class={{
            ...container.class(),
            container: true,
            [containerModifier]: true,
          }}
        >
          <div
            class={{
              ...containerInner.class(),
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    )
  }
}
