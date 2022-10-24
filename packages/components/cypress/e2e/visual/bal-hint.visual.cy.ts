describe('bal-hint', () => {
  before(() => cy.page('/components/bal-hint/test/bal-hint.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('hint-basic', 0.0)
    cy.getByTestId('basic').click().balHintFindOverlay().compareSnapshot('hint-basic-open-desktop', 0.0)
    cy.getByTestId('close-label').compareSnapshot('hint-close-label', 0.0)
    cy.getByTestId('close-label').click().balHintFindOverlay().compareSnapshot('hint-close-label-desktop', 0.0)
    cy.getByTestId('small').compareSnapshot('hint-small', 0.0)
    cy.getByTestId('small').click().balHintFindOverlay().compareSnapshot('hint-small-desktop', 0.0)
  })

  // it('basic component with close label', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('close-label-id').compareSnapshot('hint-close-label', 0.0)
  //   cy.getByTestId('close-label-id').click()
  //   cy.compareSnapshot('hint-close-label-open-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.getByTestId('close-label-id').click()
  //   cy.compareSnapshot('hint-close-label-open-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.getByTestId('close-label-id').click()
  //   cy.compareSnapshot('hint-close-label-open-mobile', 0.0)
  // })

  // it('small component', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('small-id').compareSnapshot('hint-small', 0.0)
  //   cy.getByTestId('small-id').click()
  //   cy.compareSnapshot('hint-small-open-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.getByTestId('small-id').click()
  //   cy.compareSnapshot('hint-small-open-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.getByTestId('small-id').click()
  //   cy.compareSnapshot('hint-small-open-mobile', 0.0)
  // })
})
