describe('bal-tag', () => {
  beforeEach(() => cy.visit('/components/bal-tag/test/bal-tag.visual.html').waitForDesignSystem())

  it('basic component', () => cy.getByTestId('basic').testVisual('tag-basic'))

  it('component variants', () => cy.testVisual('tag-variants'))
})
