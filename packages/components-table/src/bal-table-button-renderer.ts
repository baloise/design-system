import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community'
import { ColorTypes } from '@baloise/design-system-next-components'
import isNil from 'lodash.isnil'

interface BalTableButtonRendererOptions {
  color?: (params: ICellRendererParams) => ColorTypes
  loading?: (params: ICellRendererParams) => boolean
  href?: (params: ICellRendererParams) => string
  icon?: string
  iconRight?: boolean
  square?: boolean
  expanded?: boolean
  outlined?: boolean
  link?: boolean
  target?: '_blank' | ' _parent' | '_self' | '_top'
}

export function BalTableButtonRenderer(options: BalTableButtonRendererOptions): ICellRendererComp {
  function Renderer() {} // eslint-disable-line
  Renderer.prototype.params = {}
  Renderer.prototype.options = options

  Renderer.prototype.init = function (params: ICellRendererParams): void {
    this.params = params
    this.element = document.createElement('bal-button')
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

    const loading = isNil(options.loading) ? false : options.loading(this.params)
    this.element.setAttribute('loading', loading)

    const href = isNil(options.href) ? undefined : options.href(this.params)
    if (href) {
      this.element.setAttribute('href', href)
    }

    this.element.setAttribute('icon', isNil(options.icon) ? '' : options.icon)
    this.element.setAttribute('iconRight', isNil(options.iconRight) ? false : options.iconRight)
    this.element.setAttribute('square', isNil(options.square) ? false : options.square)
    this.element.setAttribute('expanded', isNil(options.expanded) ? false : options.expanded)
    this.element.setAttribute('outlined', isNil(options.outlined) ? false : options.outlined)
    this.element.setAttribute('link', isNil(options.link) ? false : options.link)
    this.element.setAttribute('target', isNil(options.target) ? false : options.target)
  }

  Renderer.prototype.getGui = function () {
    return this.element
  }

  Renderer.prototype.destroy = function () {} // eslint-disable-line

  return Renderer as any // eslint-disable-line
}
