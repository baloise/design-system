import { styleClassDeprecated } from '../scripts/utils.mjs'

describe('styleClassDeprecated', () => {
  test('should return an empty rules array', () => {
    const rules = styleClassDeprecated({
      prefix: 'has',
      property: 'shadow',
      values: {},
    })
    expect(rules).toEqual({ rules: [] })
    expect(rules.toString()).toEqual('')
  })

  test('should generate a sass style util class', () => {
    const rules = styleClassDeprecated({
      prefix: 'has',
      property: 'size',
      values: {
        'size-large': '4rem',
      },
    })
    expect(rules).toEqual({
      rules: [
        {
          selectors: ['.has-size-large'],
          values: [
            {
              important: false,
              prop: 'size',
              value: '4rem',
            },
          ],
        },
      ],
    })
    expect(rules.toString()).toEqual(`.has-size-large
  size: 4rem
`)
  })

  test('should add an !important tag at the end', () => {
    const rules = styleClassDeprecated({
      prefix: 'has',
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      important: true,
    })
    expect(rules).toEqual({
      rules: [
        {
          selectors: ['.has-size-large'],
          values: [
            {
              important: true,
              prop: 'size',
              value: '4rem',
            },
          ],
        },
      ],
    })
    expect(rules.toString()).toEqual(`.has-size-large
  size: 4rem !important
`)
  })

  test('should create responsive classes', () => {
    const rules = styleClassDeprecated({
      prefix: 'has',
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      responsive: true,
      breakpoints: ['mobile', 'desktop'],
    })
    expect(rules.toString()).toEqual(`.has-size-large
  size: 4rem

+mobile
  .has-size-large-mobile
    size: 4rem

+desktop
  .has-size-large-desktop
    size: 4rem
`)
  })
})
