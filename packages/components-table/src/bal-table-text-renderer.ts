import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community'
import { ColorTypes } from '@baloise/design-system-components'
import isNil from 'lodash.isnil'

interface BalTableTextRendererOptions {
  color?: (params: ICellRendererParams) => ColorTypes
  icon?: (params: ICellRendererParams) => string
  iconColor?: (params: ICellRendererParams) => ColorTypes
  iconRight?: (params: ICellRendererParams) => boolean
}

export function BalTableTextRenderer(options: BalTableTextRendererOptions = {}): ICellRendererComp {
  function Renderer() {}
  Renderer.prototype.params = {}
  Renderer.prototype.options = options

  Renderer.prototype.init = function (params: ICellRendererParams): void {
    this.params = params
    const element: HTMLSpanElement = document.createElement('span')
    element.className = 'bal-table-cell-text'
    this.element = element

    this.text = document.createElement('bal-text')
    this.text.setAttribute('small', 'true')

    this.icon = document.createElement('bal-icon')
    this.icon.setAttribute('size', 'small')

    this.update()
  }

  Renderer.prototype.refresh = function (params: ICellRendererParams) {
    this.params = params
    this.update()
    return true
  }

  Renderer.prototype.update = function () {
    this.text.innerHTML = this.params.value

    const color = isNil(options.color) ? '' : options.color(this.params)
    this.text.setAttribute('color', color)

    const icon = isNil(options.icon) ? '' : options.icon(this.params)

    if (icon.length === 0) {
      this.element.innerHTML = this.text.outerHTML
    } else {
      this.icon.setAttribute('name', icon)
      const iconColor = isNil(options.iconColor) ? '' : options.iconColor(this.params)
      this.icon.setAttribute('color', iconColor)

      const isRight = isNil(options.iconRight) ? '' : options.iconRight(this.params)
      if (isRight) {
        this.element.innerHTML = this.text.outerHTML + this.icon.outerHTML
      } else {
        this.element.innerHTML = this.icon.outerHTML + this.text.outerHTML
      }
    }
  }

  Renderer.prototype.getGui = function () {
    return this.element
  }

  Renderer.prototype.destroy = function () {}

  return Renderer as any
}
