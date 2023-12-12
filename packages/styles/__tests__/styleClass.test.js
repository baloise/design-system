import { styleClass } from '../scripts/utils.mjs'

describe('styleClass', () => {
  test('should return an empty rules array', () => {
    const rules = styleClass({
      property: 'shadow',
      values: {},
    })
    expect(rules).toEqual({ rules: [] })
    expect(rules.toString()).toEqual('')
  })

  test('should generate a sass style util class', () => {
    const rules = styleClass({
      property: 'size',
      values: {
        'size-large': '4rem',
      },
    })
    expect(rules).toEqual({
      rules: [
        {
          selectors: ['.size-large'],
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
    expect(rules.toString()).toEqual(`.size-large
  size: 4rem
`)
  })

  test('should add an !important tag at the end', () => {
    const rules = styleClass({
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      important: true,
    })
    expect(rules).toEqual({
      rules: [
        {
          selectors: ['.size-large'],
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
    expect(rules.toString()).toEqual(`.size-large
  size: 4rem !important
`)
  })

  test('should create responsive classes', () => {
    const rules = styleClass({
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      responsive: true,
      breakpoints: ['mobile', 'desktop'],
    })
    expect(rules.toString()).toEqual(`.size-large
  size: 4rem

+mobile
  .mobile\\:size-large
    size: 4rem

+desktop
  .desktop\\:size-large
    size: 4rem
`)
  })

  test('should create states classes', () => {
    const rules = styleClass({
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      states: true,
    })
    expect(rules.toString()).toEqual(`.size-large
  size: 4rem

.focus\\:size-large:focus
  size: 4rem

.hover\\:size-large:hover
  size: 4rem

.active\\:size-large:active
  size: 4rem
`)
  })

  test('should create responsive and states classes', () => {
    const rules = styleClass({
      property: 'size',
      values: {
        'size-large': '4rem',
      },
      responsive: true,
      states: true,
      breakpoints: ['mobile', 'desktop'],
    })
    expect(rules.toString()).toEqual(`.size-large
  size: 4rem

.focus\\:size-large:focus
  size: 4rem

.hover\\:size-large:hover
  size: 4rem

.active\\:size-large:active
  size: 4rem

+mobile
  .mobile\\:size-large
    size: 4rem

  .mobile\\:focus\\:size-large:focus
    size: 4rem

  .mobile\\:hover\\:size-large:hover
    size: 4rem

  .mobile\\:active\\:size-large:active
    size: 4rem

+desktop
  .desktop\\:size-large
    size: 4rem

  .desktop\\:focus\\:size-large:focus
    size: 4rem

  .desktop\\:hover\\:size-large:hover
    size: 4rem

  .desktop\\:active\\:size-large:active
    size: 4rem
`)
  })
})
