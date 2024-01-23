import { findColorValuesByTag } from '../../support/a11y.utils'

describe('bal-button', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-button/test/bal-button.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('with icon', () => {
        cy.getByTestId('icon').testA11y()
      })

      it('states', () => {
        cy.getByTestId('disabled').testA11y()
        cy.getByTestId('active').testA11y()
        cy.getByTestId('inverted').testA11y()
      })

      testColorA11y()

      testSizeA11y()
    })
  })
})

function testColorA11y() {
  const colors = findColorValuesByTag('bal-button', 'color')
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}

function testSizeA11y() {
  const sizes = findColorValuesByTag('bal-button', 'size')
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`size ${size}`, () => {
      cy.getByTestId('basic').setProperty('size', size).testA11y()
    })
  }
}
