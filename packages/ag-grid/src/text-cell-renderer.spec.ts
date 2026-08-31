import type { ICellRendererParams } from 'ag-grid-community'
import { describe, expect, it } from 'vitest'
import { createTextCellRenderer } from './text-cell-renderer'

const params = (value: unknown, data: unknown = {}) => ({ value, data }) as ICellRendererParams

describe('createTextCellRenderer', () => {
  it('renders the value as text without an icon by default', () => {
    const renderer = createTextCellRenderer()
    const cell = renderer(params('POL-1001'))

    expect(cell.textContent).toBe('POL-1001')
    expect(cell.querySelector('ds-icon')).toBeNull()
  })

  it('renders no text when the value is null or undefined', () => {
    const renderer = createTextCellRenderer()

    expect(renderer(params(null)).textContent).toBe('')
    expect(renderer(params(undefined)).textContent).toBe('')
  })

  describe('icon', () => {
    it('places the icon after the text by default', () => {
      const renderer = createTextCellRenderer({ icon: 'star-full' })
      const cell = renderer(params('POL-1001'))

      const children = [...cell.children]
      expect(children[0].tagName).toBe('SPAN')
      expect(children[1].tagName).toBe('DS-ICON')
      expect(children[1].getAttribute('name')).toBe('star-full')
    })

    it('places the icon before the text when position is "before"', () => {
      const renderer = createTextCellRenderer({ icon: 'star-full', position: 'before' })
      const cell = renderer(params('POL-1001'))

      const children = [...cell.children]
      expect(children[0].tagName).toBe('DS-ICON')
      expect(children[1].tagName).toBe('SPAN')
    })

    it('applies icon size and color', () => {
      const renderer = createTextCellRenderer({ icon: 'star-full', iconSize: 'sm', iconColor: 'primary' })
      const icon = renderer(params('POL-1001')).querySelector('ds-icon')

      expect(icon?.getAttribute('size')).toBe('sm')
      expect(icon?.getAttribute('color')).toBe('primary')
    })

    it('derives the icon from the params via a function', () => {
      const renderer = createTextCellRenderer<{ hasNote: boolean }>({
        icon: cellParams => (cellParams.data?.hasNote ? 'star-full' : undefined),
      })

      expect(renderer(params('POL-1001', { hasNote: true })).querySelector('ds-icon')).not.toBeNull()
      expect(renderer(params('POL-1002', { hasNote: false })).querySelector('ds-icon')).toBeNull()
    })
  })

  it('derives the position per row via a function', () => {
    const renderer = createTextCellRenderer<{ flag?: string }>({
      icon: cellParams => cellParams.data?.flag,
      position: cellParams => (cellParams.data?.flag === 'alert-triangle' ? 'before' : 'after'),
    })

    const flagged = renderer(params('POL-1001', { flag: 'alert-triangle' }))
    expect(flagged.children[0].tagName).toBe('DS-ICON')
    expect(flagged.children[1].tagName).toBe('SPAN')

    const other = renderer(params('POL-1002', { flag: 'star-full' }))
    expect(other.children[0].tagName).toBe('SPAN')
    expect(other.children[1].tagName).toBe('DS-ICON')
  })
})
