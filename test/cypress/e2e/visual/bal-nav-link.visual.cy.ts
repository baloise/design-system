describe('bal-nav-link', () => {
  beforeEach(() => cy.visit('/components/bal-nav/bal-nav-link/test/bal-nav-link.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop').wait(32)
    cy.getByTestId('basic').testVisual('basic-desktop')

    cy.platform('mobile').wait(32)
    cy.getByTestId('basic').testVisual('basic-mobile')
  })

  it('with title link', () => {
    cy.platform('desktop').wait(32)
    cy.getByTestId('with-title-link').testVisual('with-title-link-desktop')

    cy.platform('mobile').wait(32)
    cy.getByTestId('with-title-link').testVisual('with-title-link-mobile')
  })
})
