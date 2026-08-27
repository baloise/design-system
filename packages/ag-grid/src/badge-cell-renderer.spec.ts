import type { ICellRendererParams } from 'ag-grid-community'
import { describe, expect, it } from 'vitest'
import { createBadgeCellRenderer } from './badge-cell-renderer'

const params = (value: unknown) => ({ value }) as ICellRendererParams

describe('createBadgeCellRenderer', () => {
  it('renders the value inside a ds-badge without forcing a size, matching the ds-badge default', () => {
    const renderer = createBadgeCellRenderer()
    const cell = renderer(params(2))

    const badge = cell.querySelector('ds-badge')
    expect(badge?.textContent).toBe('2')
    expect(badge?.hasAttribute('size')).toBe(false)
    expect(badge?.hasAttribute('color')).toBe(false)
    expect(badge?.hasAttribute('icon')).toBe(false)
  })

  it('applies a static size', () => {
    const renderer = createBadgeCellRenderer({ size: 'sm' })
    const cell = renderer(params(2))

    expect(cell.querySelector('ds-badge')?.getAttribute('size')).toBe('sm')
  })

  it('applies a static color', () => {
    const renderer = createBadgeCellRenderer({ color: 'danger' })
    const cell = renderer(params(2))

    expect(cell.querySelector('ds-badge')?.getAttribute('color')).toBe('danger')
  })

  it('derives the color from the params via a function', () => {
    const renderer = createBadgeCellRenderer({
      color: cellParams => (Number(cellParams.value) > 2 ? 'danger' : 'warning'),
    })

    expect(renderer(params(1)).querySelector('ds-badge')?.getAttribute('color')).toBe('warning')
    expect(renderer(params(3)).querySelector('ds-badge')?.getAttribute('color')).toBe('danger')
  })

  it('applies a static icon', () => {
    const renderer = createBadgeCellRenderer({ icon: 'info-circle' })
    const cell = renderer(params(2))

    expect(cell.querySelector('ds-badge')?.getAttribute('icon')).toBe('info-circle')
  })

  it('renders no badge when the value is null or undefined by default', () => {
    const renderer = createBadgeCellRenderer()

    expect(renderer(params(null)).querySelector('ds-badge')).toBeNull()
    expect(renderer(params(undefined)).querySelector('ds-badge')).toBeNull()
  })

  it('renders a badge for a falsy value like 0 by default', () => {
    const renderer = createBadgeCellRenderer()

    expect(renderer(params(0)).querySelector('ds-badge')).not.toBeNull()
  })

  it('uses a custom show predicate to control visibility', () => {
    const renderer = createBadgeCellRenderer({ show: cellParams => cellParams.value === 0 })

    expect(renderer(params(0)).querySelector('ds-badge')).not.toBeNull()
    expect(renderer(params(1)).querySelector('ds-badge')).toBeNull()
  })
})
