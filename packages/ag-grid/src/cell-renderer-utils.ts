import type { ICellRendererParams } from 'ag-grid-community'

/** A static value, or a function deriving it from the cell's params. */
export type CellValueOrFn<TData, TValue, TResult> = TResult | ((params: ICellRendererParams<TData, TValue>) => TResult)

/** Resolves a {@link CellValueOrFn} to its static value for the given cell's params. */
export const resolve = <TData, TValue, TResult>(
  value: CellValueOrFn<TData, TValue, TResult> | undefined,
  params: ICellRendererParams<TData, TValue>,
): TResult | undefined =>
  typeof value === 'function' ? (value as (params: ICellRendererParams<TData, TValue>) => TResult)(params) : value

/** Whether a cell's value counts as empty (`null` or `undefined`). */
export const isEmptyValue = (value: unknown): boolean => value === null || value === undefined

/**
 * Creates the flex wrapper `div` shared by every cell renderer in this package, so the
 * rendered content is vertically centered within the AG Grid cell.
 */
export const createCellWrapper = (gap?: string): HTMLDivElement => {
  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.height = '100%'
  wrapper.style.alignItems = 'center'
  if (gap) {
    wrapper.style.gap = gap
  }
  return wrapper
}
