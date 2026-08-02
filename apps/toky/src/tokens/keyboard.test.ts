import { describe, expect, it } from 'vitest'
import { getNextCell } from './keyboard'

describe('getNextCell', () => {
  const totalRows = 3
  const totalCols = 4

  it('moves up/down/left/right within bounds', () => {
    expect(getNextCell({ row: 1, col: 1 }, 'ArrowUp', totalRows, totalCols)).toEqual({ row: 0, col: 1 })
    expect(getNextCell({ row: 1, col: 1 }, 'ArrowDown', totalRows, totalCols)).toEqual({ row: 2, col: 1 })
    expect(getNextCell({ row: 1, col: 1 }, 'ArrowLeft', totalRows, totalCols)).toEqual({ row: 1, col: 0 })
    expect(getNextCell({ row: 1, col: 1 }, 'ArrowRight', totalRows, totalCols)).toEqual({ row: 1, col: 2 })
  })

  it('returns null at the top edge for ArrowUp', () => {
    expect(getNextCell({ row: 0, col: 0 }, 'ArrowUp', totalRows, totalCols)).toBeNull()
  })

  it('returns null at the bottom edge for ArrowDown', () => {
    expect(getNextCell({ row: totalRows - 1, col: 0 }, 'ArrowDown', totalRows, totalCols)).toBeNull()
  })

  it('returns null at the left edge for ArrowLeft', () => {
    expect(getNextCell({ row: 0, col: 0 }, 'ArrowLeft', totalRows, totalCols)).toBeNull()
  })

  it('returns null at the right edge for ArrowRight', () => {
    expect(getNextCell({ row: 0, col: totalCols - 1 }, 'ArrowRight', totalRows, totalCols)).toBeNull()
  })
})
