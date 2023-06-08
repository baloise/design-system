describe('bal-toast', () => {
  beforeEach(() => cy.visit('/components/notice/bal-toast/test/bal-toast.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('toast-basic')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('toast-basic-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('toast-basic-mobile')
  })

  it('component variants', () => {
    cy.platform('desktop')
    cy.compareSnapshot('toast-variants')

    cy.platform('tablet')
    cy.compareSnapshot('toast-variants-tablet')

    cy.platform('mobile')
    cy.compareSnapshot('toast-variants-mobile')
  })
})
