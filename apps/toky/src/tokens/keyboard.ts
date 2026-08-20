export interface CellPosition {
  row: number
  col: number
}

export type NavigationKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export function getNextCell(
  current: CellPosition,
  key: NavigationKey,
  totalRows: number,
  totalCols: number,
): CellPosition | null {
  const { row, col } = current

  switch (key) {
    case 'ArrowUp':
      return row - 1 >= 0 ? { row: row - 1, col } : null
    case 'ArrowDown':
      return row + 1 < totalRows ? { row: row + 1, col } : null
    case 'ArrowLeft':
      return col - 1 >= 0 ? { row, col: col - 1 } : null
    case 'ArrowRight':
      return col + 1 < totalCols ? { row, col: col + 1 } : null
  }
}
