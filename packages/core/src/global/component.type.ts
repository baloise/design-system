import { ComponentInterface } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Loggable } from '@utils'

export interface DsComponentInterface extends ComponentInterface, Loggable {
  el: HTMLStencilElement
}
