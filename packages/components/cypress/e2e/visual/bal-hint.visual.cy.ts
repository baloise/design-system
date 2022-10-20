describe('bal-hint', () => {
  before(() => cy.page('/components/bal-hint/test/bal-hint.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').click()
    cy.compareSnapshot('hint-basic', 0.0)
  })

  // it('basic component open', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('basic').click()
  //   cy.compareSnapshot('hint-basic-open-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.getByTestId('basic').click()
  //   cy.compareSnapshot('hint-basic-open-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.getByTestId('basic').click()
  //   cy.compareSnapshot('hint-basic-open-mobile', 0.0)
  // })

  // it('basic component with close label', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('close-label').compareSnapshot('hint-close-label', 0.0)
  // })

  // it('basic component open with close label', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('close-label').click()
  //   cy.compareSnapshot('hint-close-label-open-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.getByTestId('close-label').click()
  //   cy.compareSnapshot('hint-close-label-open-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.getByTestId('close-label').click()
  //   cy.compareSnapshot('hint-close-label-open-mobile', 0.0)
  // })

  // it('small component', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('small').compareSnapshot('hint-small', 0.0)
  // })

  // it('small component', () => {
  //   cy.platform('desktop')
  //   cy.getByTestId('small').click()
  //   cy.compareSnapshot('hint-small-open-desktop', 0.0)

  //   cy.platform('tablet')
  //   cy.getByTestId('small').click()
  //   cy.compareSnapshot('hint-small-open-tablet', 0.0)

  //   cy.platform('mobile')
  //   cy.getByTestId('small').click()
  //   cy.compareSnapshot('hint-small-open-mobile', 0.0)
  // })
})
