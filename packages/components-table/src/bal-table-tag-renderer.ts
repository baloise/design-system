import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community'
import type { Props } from '@baloise/design-system-next-components'
import isNil from 'lodash.isnil'

interface BalTableTagRendererOptions {
  color?: (params: ICellRendererParams) => Props.BalTagColor
}

export function BalTableTagRenderer(options: BalTableTagRendererOptions): ICellRendererComp {
  function Renderer() {} // eslint-disable-line
  Renderer.prototype.params = {}
  Renderer.prototype.options = options

  Renderer.prototype.init = function (params: ICellRendererParams): void {
    this.params = params
    this.element = document.createElement('bal-tag')
    this.element.setAttribute('size', '')
    this.element.innerHTML = params.value
    this.update()
  }

  Renderer.prototype.refresh = function (params: ICellRendererParams) {
    this.params = params
    this.update()
    return true
  }

  Renderer.prototype.update = function () {
    const color = isNil(options.color) ? '' : options.color(this.params)
    this.element.setAttribute('color', color)
  }

  Renderer.prototype.getGui = function () {
    return this.element
  }

  Renderer.prototype.destroy = function () {} // eslint-disable-line

  return Renderer as any // eslint-disable-line
}
