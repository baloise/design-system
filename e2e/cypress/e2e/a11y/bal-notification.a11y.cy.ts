import { findPropertyValuesByTag } from '../../support/a11y.utils'

describe('bal-notification', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-notification/test/bal-notification.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y()
    })
  })
})

function testColorA11y() {
  const colors = findPropertyValuesByTag('bal-notification', 'color')
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}
