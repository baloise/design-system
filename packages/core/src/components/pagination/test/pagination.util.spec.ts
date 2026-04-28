import { generatePaginationControl } from '../pagination.util'

// helpers
const types = (controls: ReturnType<typeof generatePaginationControl>) => controls.map(c => c.type)
const labels = (controls: ReturnType<typeof generatePaginationControl>) => controls.map(c => c.label)
const activeLabel = (controls: ReturnType<typeof generatePaginationControl>) =>
  controls.find(c => c.active)?.label ?? null

describe('generatePaginationControl', () => {
  describe('all pages fit (totalPages <= 5 + pageRange * 2)', () => {
    it('shows every page when totalPages equals the threshold', () => {
      const controls = generatePaginationControl(1, 9, 2)
      expect(types(controls)).toEqual(Array(9).fill('page'))
      expect(labels(controls)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
    })

    it('marks the active page correctly', () => {
      expect(activeLabel(generatePaginationControl(3, 5, 2))).toBe('3')
      expect(activeLabel(generatePaginationControl(5, 5, 2))).toBe('5')
    })

    it('shows all pages with pageRange 0 when totalPages <= 5', () => {
      const controls = generatePaginationControl(2, 5, 0)
      expect(types(controls)).toEqual(Array(5).fill('page'))
      expect(activeLabel(controls)).toBe('2')
    })
  })

  describe('near start (value <= numberOfPages - 2 - pageRange)', () => {
    // With pageRange=2: threshold = 9 - 2 - 2 = 5
    it('shows leading pages, dots, then last page when on first page', () => {
      const controls = generatePaginationControl(1, 20, 2)
      expect(types(controls)).toEqual(['page', 'page', 'page', 'page', 'page', 'page', 'page', 'dots', 'page'])
      expect(labels(controls)).toEqual(['1', '2', '3', '4', '5', '6', '7', '...', '20'])
      expect(activeLabel(controls)).toBe('1')
    })

    it('stays in near-start branch at the boundary (value = 5)', () => {
      const controls = generatePaginationControl(5, 20, 2)
      expect(types(controls)).toEqual(['page', 'page', 'page', 'page', 'page', 'page', 'page', 'dots', 'page'])
      expect(activeLabel(controls)).toBe('5')
    })

    it('uses correct leading count for pageRange 1', () => {
      // numberOfPages = 7, threshold = 7 - 2 - 1 = 4; leading = 7 - 2 = 5 pages
      const controls = generatePaginationControl(2, 20, 1)
      expect(types(controls)).toEqual(['page', 'page', 'page', 'page', 'page', 'dots', 'page'])
      expect(activeLabel(controls)).toBe('2')
    })
  })

  describe('near end (value >= totalPages - 3)', () => {
    // With pageRange=2, totalPages=20: threshold = 17; trailing start = 20 - 9 + 3 = 14
    it('shows first page, dots, then trailing pages when on last page', () => {
      const controls = generatePaginationControl(20, 20, 2)
      expect(types(controls)).toEqual(['page', 'dots', 'page', 'page', 'page', 'page', 'page', 'page', 'page'])
      expect(labels(controls)).toEqual(['1', '...', '14', '15', '16', '17', '18', '19', '20'])
      expect(activeLabel(controls)).toBe('20')
    })

    it('stays in near-end branch at the boundary (value = totalPages - 3)', () => {
      const controls = generatePaginationControl(17, 20, 2)
      expect(types(controls)).toEqual(['page', 'dots', 'page', 'page', 'page', 'page', 'page', 'page', 'page'])
      expect(activeLabel(controls)).toBe('17')
    })
  })

  describe('middle (value is between start and end ranges)', () => {
    it('shows 1, dots, window around value, dots, last page', () => {
      const controls = generatePaginationControl(10, 20, 2)
      expect(types(controls)).toEqual(['page', 'dots', 'page', 'page', 'page', 'page', 'page', 'dots', 'page'])
      expect(labels(controls)).toEqual(['1', '...', '8', '9', '10', '11', '12', '...', '20'])
      expect(activeLabel(controls)).toBe('10')
    })

    it('window shifts with value', () => {
      const controls = generatePaginationControl(6, 20, 2)
      expect(labels(controls)).toEqual(['1', '...', '4', '5', '6', '7', '8', '...', '20'])
      expect(activeLabel(controls)).toBe('6')
    })

    it('respects pageRange 1 — window is 3 pages', () => {
      const controls = generatePaginationControl(10, 20, 1)
      expect(types(controls)).toEqual(['page', 'dots', 'page', 'page', 'page', 'dots', 'page'])
      expect(labels(controls)).toEqual(['1', '...', '9', '10', '11', '...', '20'])
    })

    it('respects pageRange 0 — window is 1 page', () => {
      const controls = generatePaginationControl(10, 20, 0)
      expect(types(controls)).toEqual(['page', 'dots', 'page', 'dots', 'page'])
      expect(labels(controls)).toEqual(['1', '...', '10', '...', '20'])
    })
  })

  describe('input guards', () => {
    it('resets value to 1 when value is negative', () => {
      const controls = generatePaginationControl(-1, 20, 2)
      expect(activeLabel(controls)).toBe('1')
      // value=1 is in near-start range → has leading pages
      expect(types(controls).at(-2)).toBe('dots')
    })

    it('resets value to 1 when value exceeds totalPages', () => {
      const controls = generatePaginationControl(25, 20, 2)
      expect(activeLabel(controls)).toBe('1')
    })

    it('resets totalPages to 10 when totalPages is 0 or negative', () => {
      // totalPages becomes 10, which is > numberOfPages=9 with pageRange=2
      const controls = generatePaginationControl(5, 0, 2)
      expect(labels(controls).at(-1)).toBe('10')
    })

    it('resets pageRange to 2 when pageRange is negative', () => {
      // Should behave identically to pageRange=2
      const normal = generatePaginationControl(10, 20, 2)
      const guarded = generatePaginationControl(10, 20, -1)
      expect(labels(guarded)).toEqual(labels(normal))
    })
  })
})
