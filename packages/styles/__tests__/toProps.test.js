import { toProps } from '../scripts/utils.mjs'

describe('toProps', () => {
  test('should return only key and value', () => {
    expect(
      toProps({
        tokens: {
          black: {
            value: '#000000',
            noFigmaImport: true,
            filePath: 'src/color/color-base.json',
            isSource: true,
            original: {
              value: '#000000',
              noFigmaImport: true,
            },
            name: 'bal-color-black',
            attributes: {
              category: 'color',
              type: 'base',
              item: 'black',
            },
            path: ['color', 'base', 'black'],
          },
        },
      }),
    ).toEqual({ 'color-black': 'var(--bal-color-black)' })
  })

  test('should return a nested key and value', () => {
    expect(
      toProps({
        tokens: {
          primary: {
            1: {
              value: '#e5e7f0',
              filePath: 'src/color/color-base.json',
              isSource: true,
              original: {
                value: '#e5e7f0',
              },
              name: 'bal-color-primary-1',
              attributes: {
                category: 'color',
                type: 'base',
                item: 'primary',
                subitem: '1',
              },
              path: ['color', 'base', 'primary', '1'],
            },
          },
        },
      }),
    ).toEqual({ 'color-primary-1': 'var(--bal-color-primary-1)' })
  })

  test('should return a alias key and value', () => {
    expect(
      toProps({
        tokens: {
          primary: {
            value: '#000d6e',
            noFigmaImport: true,
            filePath: 'src/color/color-alias.json',
            isSource: true,
            original: {
              value: '{color.base.primary.5}',
              noFigmaImport: true,
            },
            name: 'bal-color-primary',
            attributes: {
              category: 'color',
              type: 'primary',
            },
            path: ['color', 'primary'],
          },
        },
      }),
    ).toEqual({ 'color-primary': 'var(--bal-color-primary-5)' })
  })

  test('should return a prefixed/alias key and value', () => {
    expect(
      toProps({
        prefix: 'has',
        tokens: {
          primary: {
            value: '#000d6e',
            noFigmaImport: true,
            filePath: 'src/color/color-alias.json',
            isSource: true,
            original: {
              value: '{color.base.primary.5}',
              noFigmaImport: true,
            },
            name: 'bal-color-primary',
            attributes: {
              category: 'color',
              type: 'primary',
            },
            path: ['color', 'primary'],
          },
        },
      }),
    ).toEqual({ 'has-color-primary': 'var(--bal-color-primary-5)' })
  })

  test('should return a nested key and value', () => {
    expect(
      toProps({
        tokens: {
          primary: {
            1: {
              value: '#e5e7f0',
              filePath: 'src/color/color-base.json',
              isSource: true,
              original: {
                value: '#e5e7f0',
              },
              name: 'bal-color-primary-1',
              attributes: {
                category: 'color',
                type: 'base',
                item: 'primary',
                subitem: '1',
              },
              path: ['color', 'base', 'primary', '1'],
            },
          },
          red: {
            1: {
              value: '#e5e7f0',
              filePath: 'src/color/color-base.json',
              isSource: true,
              original: {
                value: '#e5e7f0',
              },
              name: 'bal-color-red-1',
              attributes: {
                category: 'color',
                type: 'base',
                item: 'red',
                subitem: '1',
              },
              path: ['color', 'base', 'red', '1'],
            },
          },
        },
      }),
    ).toEqual({
      'color-primary-1': 'var(--bal-color-primary-1)',
      'color-red-1': 'var(--bal-color-red-1)',
    })
  })
})
