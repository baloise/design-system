describe('bal-pagination', () => {
  beforeEach(() => cy.visit('/components/bal-pagination/test/bal-pagination.visual.html').waitForDesignSystem())

  context('desktop', () => {
    beforeEach(() => cy.platform('desktop'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('pagination-basic-desktop')
      cy.getByTestId('small').testVisual('pagination-small-desktop')
      cy.getByTestId('small-with-dots').testVisual('pagination-small-with-dots-desktop')
    })
  })

  context('tablet', () => {
    beforeEach(() => cy.platform('tablet'))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('pagination-basic-tablet')
      cy.getByTestId('small').testVisual('pagination-small-tablet')
      cy.getByTestId('small-with-dots').testVisual('pagination-small-with-dots-tablet')
    })
  })

  context('mobile', () => {
    beforeEach(() => cy.platform('mobile').wait(100))

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('pagination-basic-mobile')
      cy.getByTestId('small').testVisual('pagination-small-mobile')
      cy.getByTestId('small-with-dots').testVisual('pagination-small-with-dots-mobile')
    })
  })
})
