describe('bal-accordion', () => {
  before(() => cy.page('/components/bal-accordion/test/bal-accordion.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('accordion-desktop', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-desktop-open', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-desktop-closed', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('accordion-tablet', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-tablet-open', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-tablet-closed', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('accordion-mobile', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-mobile-open', 0.0)
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').compareSnapshot('accordion-mobile-closed', 0.0)
  })

  it('with card', () => {
    cy.platform('desktop')
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card', 0.0)
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card-open', 0.0)
    cy.getByTestId('with-card').click()
    cy.getByTestId('with-card').compareSnapshot('accordion-with-card-closed', 0.0)
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('accordion-variants', 0.0)

    cy.platform('tablet')
    cy.compareSnapshot('accordion-variants-tablet', 0.0)

    cy.platform('mobile')
    cy.compareSnapshot('accordion-variants-mobile', 0.0)
  })
})
