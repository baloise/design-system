import type { ICellRendererParams } from 'ag-grid-community'
import { createCellWrapper } from './cell-renderer-utils'

export interface ButtonCellRendererAction<TData = unknown, TValue = unknown> {
  /** Button label. */
  readonly label: string
  /** `ds-button` `color` attribute. Defaults to `'secondary'`. */
  readonly color?: string
  /** `ds-button` `size` attribute. Defaults to `'sm'`. */
  readonly size?: string
  /** `ds-button` `icon` attribute. */
  readonly icon?: string
  /** Called with the cell's params when the button is clicked. */
  readonly onClick?: (params: ICellRendererParams<TData, TValue>) => void
}

/**
 * Creates an AG Grid `cellRenderer` that renders one or more `ds-button` elements,
 * typically for a row-actions column.
 *
 * @example
 * ```ts
 * {
 *   headerName: 'Actions',
 *   cellRenderer: createButtonCellRenderer([
 *     { label: 'Edit', color: 'secondary', onClick: (params) => edit(params.data) },
 *     { label: 'Delete', color: 'danger', onClick: (params) => remove(params.data) },
 *   ]),
 *   sortable: false,
 *   filter: false,
 * }
 * ```
 */
export function createButtonCellRenderer<TData = unknown, TValue = unknown>(
  actions: ReadonlyArray<ButtonCellRendererAction<TData, TValue>>,
) {
  return (params: ICellRendererParams<TData, TValue>): HTMLElement => {
    const wrapper = createCellWrapper('0.5rem')

    for (const action of actions) {
      const button = document.createElement('ds-button')
      button.textContent = action.label
      button.setAttribute('size', action.size ?? 'sm')
      button.setAttribute('color', action.color ?? 'secondary')
      if (action.icon) {
        button.setAttribute('icon', action.icon)
      }
      if (action.onClick) {
        button.addEventListener('click', () => action.onClick?.(params))
      }
      wrapper.append(button)
    }

    return wrapper
  }
}
