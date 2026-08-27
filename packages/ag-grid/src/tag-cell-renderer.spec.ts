import type { ICellRendererParams } from 'ag-grid-community'
import { describe, expect, it } from 'vitest'
import { createTagCellRenderer } from './tag-cell-renderer'

const params = (value: unknown) => ({ value }) as ICellRendererParams

describe('createTagCellRenderer', () => {
  it('renders the value inside a ds-tag without forcing a size, matching the ds-tag default', () => {
    const renderer = createTagCellRenderer()
    const cell = renderer(params('Active'))

    const tag = cell.querySelector('ds-tag')
    expect(tag?.textContent).toBe('Active')
    expect(tag?.hasAttribute('size')).toBe(false)
    expect(tag?.hasAttribute('color')).toBe(false)
  })

  it('applies a static size', () => {
    const renderer = createTagCellRenderer({ size: 'lg' })
    const cell = renderer(params('Active'))

    expect(cell.querySelector('ds-tag')?.getAttribute('size')).toBe('lg')
  })

  it('applies a static color', () => {
    const renderer = createTagCellRenderer({ color: 'success' })
    const cell = renderer(params('Active'))

    expect(cell.querySelector('ds-tag')?.getAttribute('color')).toBe('success')
  })

  it('derives the color from the params via a function', () => {
    const renderer = createTagCellRenderer({
      color: cellParams => (cellParams.value === 'Active' ? 'success' : 'grey'),
    })

    expect(renderer(params('Active')).querySelector('ds-tag')?.getAttribute('color')).toBe('success')
    expect(renderer(params('Cancelled')).querySelector('ds-tag')?.getAttribute('color')).toBe('grey')
  })

  it('renders no tag when the value is null or undefined', () => {
    const renderer = createTagCellRenderer()

    expect(renderer(params(null)).querySelector('ds-tag')).toBeNull()
    expect(renderer(params(undefined)).querySelector('ds-tag')).toBeNull()
  })
})
