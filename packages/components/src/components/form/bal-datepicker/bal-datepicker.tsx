import { Component, Host, h, ComponentInterface } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'bal-datepicker',
  styleUrls: {
    css: 'bal-datepicker.sass',
  },
})
export class Datepicker implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('bal-datepicker')
  createLogger(log: LogInstance) {
    this.log = log
  }

  render() {
    const block = BEM.block('datepicker')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      ></Host>
    )
  }
}
