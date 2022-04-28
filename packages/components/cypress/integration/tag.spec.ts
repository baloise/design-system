import { Props } from '../../src'
import { testOnPlatforms } from '../../../testing/src'

describe('Tag', () => {
  testOnPlatforms(['mobile', 'desktop'], () => {
    beforeEach(() => cy.page('/components/bal-tag/test/bal-tag.cy.html'))

    it('should have content', () => {
      cy.getByTestId('tag').contains('My tag')
    })

    it('should fire close event', () => {
      cy.getByTestId('tag').setProperty('closable', true).spyEvent('balCloseClick').find('bal-close').click()

      cy.get('@balCloseClick').should('have.been.calledOnce')
    })
  })

  context('a11y', () => {
    before(() => cy.platform('desktop').pageA11y('/components/bal-tag/test/bal-tag.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('tag').testA11y()
      })

      testColorA11y(['danger', 'info', 'primary', 'success', 'warning'])
    })
  })
})

function testColorA11y(colors: Props.BalTagColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('tag').setProperty('color', color).testA11y()
    })
  }
}
