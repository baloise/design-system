import { jsonClass } from '../scripts/utils.mjs'

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
          properties: 'display: block;',
        },
        {
          class: 'is-inline',
          properties: 'display: inline;',
        },
      ],
    })
  })
})
