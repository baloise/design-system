import { app } from '../support/app'

describe('Slider', () => {
  const page = app.getSliderPage()

  it('should have value and typeable', () => {
    page.open()
    cy.get(page.slider).should('have.value', '20')
    cy.get(page.slider).type('30').should('have.value', '30')
    cy.get(page.slider)
      .invoke('val', 50)
      .trigger('change')
      .should('have.value', '50')
  })

  it('should be disabled', () => {
    cy.get(page.slider).should('not.be.disabled')
    cy.get(page.sliderDisabled).should('be.disabled')
  })

  it('should be focusable', () => {
    cy.get(page.slider).focus().should('be.focused')
    cy.get(page.slider).blur().should('not.be.focused')
  })
})
