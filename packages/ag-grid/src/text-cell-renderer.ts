import type { ICellRendererParams } from 'ag-grid-community'
import { type CellValueOrFn, createCellWrapper, isEmptyValue, resolve } from './cell-renderer-utils'

export interface TextCellRendererOptions<TData = unknown, TValue = unknown> {
  /**
   * `ds-icon` `name` attribute, or a function deriving it from the cell's params.
   * Return `undefined`/`''` to omit the icon for a given row.
   */
  readonly icon?: CellValueOrFn<TData, TValue, string | undefined>
  /** `ds-icon` `size` attribute. Defaults to the `ds-icon` default size. */
  readonly iconSize?: string
  /** `ds-icon` `color` attribute. Defaults to the `ds-icon` default color. */
  readonly iconColor?: string
  /**
   * Places the icon before or after the text, or a function deriving it from
   * the cell's params. Defaults to `'after'`.
   */
  readonly position?: CellValueOrFn<TData, TValue, 'before' | 'after'>
}

/**
 * Creates an AG Grid `cellRenderer` that renders the cell's value as text, with an
 * optional `ds-icon` placed before or after it.
 *
 * @example
 * ```ts
 * {
 *   field: 'policyNumber',
 *   cellRenderer: createTextCellRenderer<Policy>({
 *     icon: (params) => params.data?.flag,
 *     position: 'before',
 *   }),
 * }
 * ```
 */
export function createTextCellRenderer<TData = unknown, TValue = unknown>(
  options: TextCellRendererOptions<TData, TValue> = {},
) {
  return (params: ICellRendererParams<TData, TValue>): HTMLElement => {
    const wrapper = createCellWrapper('0.25rem')

    if (isEmptyValue(params.value)) {
      return wrapper
    }

    const text = document.createElement('span')
    text.textContent = String(params.value)

    const iconName = resolve(options.icon, params)
    const position = resolve(options.position, params) ?? 'after'

    let indicator: HTMLElement | undefined
    if (iconName) {
      const icon = document.createElement('ds-icon')
      icon.setAttribute('name', iconName)
      icon.setAttribute('inline', '')
      if (options.iconSize) {
        icon.setAttribute('size', options.iconSize)
      }
      if (options.iconColor) {
        icon.setAttribute('color', options.iconColor)
      }
      indicator = icon
    }

    if (indicator && position === 'before') {
      wrapper.append(indicator)
    }

    wrapper.append(text)

    if (indicator && position === 'after') {
      wrapper.append(indicator)
    }

    return wrapper
  }
}
