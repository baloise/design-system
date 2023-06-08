describe('bal-accordion', () => {
  beforeEach(() => cy.visit('/components/bal-accordion/test/bal-accordion.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('accordion-desktop')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-desktop-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-desktop-closed')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('accordion-tablet')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-tablet-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-tablet-closed')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('accordion-mobile')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-mobile-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-mobile-closed')
  })

  it('with card', () => {
    cy.platform('desktop')
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card')
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card-open')
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card-closed')
  })
})
