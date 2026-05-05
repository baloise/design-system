import { toCssVar } from '../utils'

describe('toCssVar', () => {
  test('should parse the value', () => {
    expect(
      toCssVar({
        value: '1',
        noFigmaImport: true,
        filePath: 'src/opacity.json',
        isSource: true,
        original: {
          value: '1',
          noFigmaImport: true,
        },
        name: 'ds-opacity-100',
        attributes: {
          category: 'opacity',
          type: '100',
        },
        path: ['opacity', '100'],
      }),
    ).toEqual('var(--ds-opacity-100)')
  })

  test('should parse the value of a reference', () => {
    expect(
      toCssVar({
        value: '0.6',
        noFigmaImport: true,
        filePath: 'src/opacity.json',
        isSource: true,
        original: {
          value: '{opacity.60}',
          noFigmaImport: true,
        },
        name: 'ds-opacity-overlay',
        attributes: {
          category: 'opacity',
          type: 'overlay',
        },
        path: ['opacity', 'overlay'],
      }),
    ).toEqual('var(--ds-opacity-overlay)')
  })
})
