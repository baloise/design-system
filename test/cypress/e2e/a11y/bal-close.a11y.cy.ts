import { findPropertyValuesByTag } from '../../support/a11y.utils'

describe('bal-close', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-close/test/bal-close.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('inverted', () => {
        cy.getByTestId('inverted').testA11y()
      })

      testSizeA11y()
    })
  })
})

function testSizeA11y() {
  const sizes = findPropertyValuesByTag('bal-close', 'size')
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`size ${size}`, () => {
      cy.getByTestId('basic').setProperty('size', size).testA11y()
    })
  }
}
