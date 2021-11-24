import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community'
import { ColorTypes } from '@baloise/design-system-components'
import isNil from 'lodash.isnil'

interface BalTableTagRendererOptions {
  color?: (params: ICellRendererParams) => ColorTypes
}

export function BalTableTagRenderer(options: BalTableTagRendererOptions): ICellRendererComp {
  function Renderer() {}
  Renderer.prototype.params = {}
  Renderer.prototype.options = options

  Renderer.prototype.init = function (params: ICellRendererParams): void {
    this.params = params
    this.element = document.createElement('bal-tag')
    this.element.setAttribute('size', 'small')
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

  Renderer.prototype.destroy = function () {}

  return Renderer as any
}
