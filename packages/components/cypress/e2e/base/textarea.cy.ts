import { app } from '../../support/app'

describe('Textarea', () => {
  const page = app.getTextareaPage()

  it('should verify the existens of the components', () => {
    page.open()
    cy.get(page.textarea).should('exist')
    cy.get('.bubu').should('not.exist')
  })

  it('should have value and typeable', () => {
    page.open()
    cy.get(page.textarea).should('have.value', '')
    cy.get(page.textarea).type('bubu').should('have.value', 'bubu')
    cy.get(page.textarea).clear().should('not.have.value', 'bubu').should('have.value', '')
  })

  it('should have placeholder', () => {
    cy.get(page.textarea).should('have.attr', 'placeholder', 'Enter your comment')
    cy.get(page.textareaDisabled).should('not.have.attr', 'placeholder', 'Enter your comment')
  })

  it('should be disabled', () => {
    cy.get(page.textarea).should('not.be.disabled')
    cy.get(page.textareaDisabled).should('be.disabled')
  })

  it('should be focusable', () => {
    cy.get(page.textarea).focus().should('be.focused')
    cy.get(page.textarea).blur().should('not.be.focused')
  })
})
