import { balHighlight } from './balHighlight'

describe('balHighlight', () => {
  test('should highlight search query in the text', () => {
    let highlightedSearchText = 'search <span class="bal-highlight">text</span>'
    expect(balHighlight('search text', 'text', 'bal-highlight')).toBe(highlightedSearchText)
  })
  test('should return same text without search query', () => {
    expect(balHighlight('search text', '')).toBe('search text')
  })
})
