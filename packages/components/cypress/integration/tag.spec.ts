import { byTestId } from '../../../testing/src'

describe('Tag', () => {
  const basicTag = byTestId('tag')
  const closableTag = byTestId('closable-tag')

  before(() => cy.visitPage('/components/bal-tag/test/bal-tag.cy.html'))

  it('should have content', () => {
    cy.get(basicTag).contains('My tag')
  })

  it('should have prop color', () => {
    cy.get(basicTag).should('have.attr', 'color', 'danger')
  })

  it('should fire close event', () => {
    cy.get(closableTag)
      .then($el => $el.on('balCloseClick', cy.stub().as('balCloseClick')))
      .find('bal-close')
      .click()
    cy.get('@balCloseClick').should('have.been.called')
  })
})
