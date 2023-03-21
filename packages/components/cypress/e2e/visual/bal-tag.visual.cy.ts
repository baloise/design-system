describe('bal-tag', () => {
  beforeEach(() => cy.visit('/components/bal-tag/test/bal-tag.visual.html').waitForDesignSystem())

  it('basic component', () => cy.getByTestId('basic').compareSnapshot('tag-basic', 0.0))

  it('component variants', () => cy.compareSnapshot('tag-variants', 0.0))
})
