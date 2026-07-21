import { jsonClass } from '../utils'

describe('jsonClass', () => {
  test('should generate a json output for the docs', () => {
    expect(
      jsonClass({
        property: 'display',
        values: {
          'block': 'block',
          'is-inline': 'inline',
        },
      }),
    ).toEqual({
      display: [
        {
          class: 'block',
          css: 'display: block;',
          property: 'display',
          value: 'block',
        },
        {
          class: 'is-inline',
          css: 'display: inline;',
          property: 'display',
          value: 'inline',
        },
      ],
    })
  })
})
