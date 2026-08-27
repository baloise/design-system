import type { ICellRendererParams } from 'ag-grid-community'
import { describe, expect, it, vi } from 'vitest'
import { createButtonCellRenderer } from './button-cell-renderer'

const params = (data: unknown) => ({ data }) as ICellRendererParams

describe('createButtonCellRenderer', () => {
  it('renders one ds-button per action with defaults applied', () => {
    const renderer = createButtonCellRenderer([{ label: 'Edit' }])
    const cell = renderer(params({}))

    const button = cell.querySelector('ds-button')
    expect(button?.textContent).toBe('Edit')
    expect(button?.getAttribute('size')).toBe('sm')
    expect(button?.getAttribute('color')).toBe('secondary')
  })

  it('renders multiple actions in order', () => {
    const renderer = createButtonCellRenderer([{ label: 'Edit' }, { label: 'Delete', color: 'danger' }])
    const buttons = renderer(params({})).querySelectorAll('ds-button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toBe('Edit')
    expect(buttons[1].textContent).toBe('Delete')
    expect(buttons[1].getAttribute('color')).toBe('danger')
  })

  it('sets the icon attribute only when provided', () => {
    const renderer = createButtonCellRenderer([{ label: 'Edit', icon: 'pencil' }, { label: 'Delete' }])
    const buttons = renderer(params({})).querySelectorAll('ds-button')

    expect(buttons[0].getAttribute('icon')).toBe('pencil')
    expect(buttons[1].hasAttribute('icon')).toBe(false)
  })

  it('calls onClick with the cell params when the button is clicked', () => {
    const onClick = vi.fn()
    const rowData = { id: 'POL-1001' }
    const renderer = createButtonCellRenderer([{ label: 'Edit', onClick }])
    const cellParams = params(rowData)

    renderer(cellParams).querySelector('ds-button')?.dispatchEvent(new MouseEvent('click'))

    expect(onClick).toHaveBeenCalledWith(cellParams)
  })
})
