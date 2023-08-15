describe('bal-pagination', () => {
  beforeEach(() => cy.visit('/components/bal-pagination/test/bal-pagination.visual.html').waitForDesignSystem())

  context('desktop', () => {
    beforeEach(() => cy.platform('desktop'))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('pagination-basic-desktop')
      cy.getByTestId('small').compareSnapshot('pagination-small-desktop')
      cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-desktop')
    })
  })

  context('tablet', () => {
    beforeEach(() => cy.platform('tablet'))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('pagination-basic-tablet')
      cy.getByTestId('small').compareSnapshot('pagination-small-tablet')
      cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-tablet')
    })
  })

  context('mobile', () => {
    beforeEach(() => cy.platform('mobile'))

    it('basic component', () => {
      cy.getByTestId('basic').compareSnapshot('pagination-basic-mobile')
      cy.getByTestId('small').compareSnapshot('pagination-small-mobile')
      cy.getByTestId('small-with-dots').compareSnapshot('pagination-small-with-dots-mobile')
    })
  })
})
