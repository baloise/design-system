import type { ICellRendererParams } from 'ag-grid-community'
import { type CellValueOrFn, createCellWrapper, isEmptyValue, resolve } from './cell-renderer-utils'

export interface BadgeCellRendererOptions<TData = unknown, TValue = unknown> {
  /** `ds-badge` `size` attribute. Defaults to the `ds-badge` default (base) size. */
  readonly size?: string
  /** `ds-badge` `color` attribute, or a function deriving it from the cell's params. */
  readonly color?: CellValueOrFn<TData, TValue, string>
  /** `ds-badge` `icon` attribute, or a function deriving it from the cell's params. */
  readonly icon?: CellValueOrFn<TData, TValue, string | undefined>
  /**
   * Determines whether the badge is rendered for a given cell. Defaults to hiding the badge
   * for `null`/`undefined` values.
   */
  readonly show?: (params: ICellRendererParams<TData, TValue>) => boolean
}

/**
 * Creates an AG Grid `cellRenderer` that renders the cell's value inside a `ds-badge`.
 *
 * @example
 * ```ts
 * {
 *   field: 'openClaims',
 *   cellRenderer: createBadgeCellRenderer<Policy>({
 *     color: 'danger',
 *   }),
 * }
 * ```
 */
export function createBadgeCellRenderer<TData = unknown, TValue = unknown>(
  options: BadgeCellRendererOptions<TData, TValue> = {},
) {
  return (params: ICellRendererParams<TData, TValue>): HTMLElement => {
    const wrapper = createCellWrapper()

    const show = options.show ? options.show(params) : !isEmptyValue(params.value)
    if (!show) {
      return wrapper
    }

    const badge = document.createElement('ds-badge')
    badge.textContent = String(params.value)
    if (options.size) {
      badge.setAttribute('size', options.size)
    }

    const color = resolve(options.color, params)
    if (color) {
      badge.setAttribute('color', color)
    }

    const icon = resolve(options.icon, params)
    if (icon) {
      badge.setAttribute('icon', icon)
    }

    wrapper.append(badge)
    return wrapper
  }
}
