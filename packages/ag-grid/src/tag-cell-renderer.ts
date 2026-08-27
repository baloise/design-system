import type { ICellRendererParams } from 'ag-grid-community'
import { type CellValueOrFn, createCellWrapper, isEmptyValue, resolve } from './cell-renderer-utils'

export interface TagCellRendererOptions<TData = unknown, TValue = unknown> {
  /** `ds-tag` `size` attribute. Defaults to `'sm'`. */
  readonly size?: string
  /** `ds-tag` `color` attribute, or a function deriving it from the cell's params. */
  readonly color?: CellValueOrFn<TData, TValue, string>
}

/**
 * Creates an AG Grid `cellRenderer` that renders the cell's value inside a `ds-tag`.
 *
 * @example
 * ```ts
 * {
 *   field: 'status',
 *   cellRenderer: createTagCellRenderer({
 *     color: (params) => STATUS_TAG_COLORS[params.value] ?? 'grey',
 *   }),
 * }
 * ```
 */
export function createTagCellRenderer<TData = unknown, TValue = unknown>(
  options: TagCellRendererOptions<TData, TValue> = {},
) {
  return (params: ICellRendererParams<TData, TValue>): HTMLElement => {
    const wrapper = createCellWrapper()

    if (isEmptyValue(params.value)) {
      return wrapper
    }

    const tag = document.createElement('ds-tag')
    tag.textContent = String(params.value)
    tag.setAttribute('size', options.size ?? 'sm')

    const color = resolve(options.color, params)
    if (color) {
      tag.setAttribute('color', color)
    }

    wrapper.append(tag)
    return wrapper
  }
}
