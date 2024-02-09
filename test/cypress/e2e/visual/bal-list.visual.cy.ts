describe('bal-list', () => {
  beforeEach(() => cy.visit('/components/bal-list/test/bal-list.visual.html').waitForDesignSystem())

  it('basic component', () => cy.getByTestId('basic').testVisual('list-basic'))

  it('sizes variants', () => cy.getByTestId('sizes').testVisual('list-sizes'))

  it('backgrounds variants', () => cy.getByTestId('backgrounds').testVisual('list-backgrounds'))

  it('component variants', () => cy.testVisual('list-variants'))
})
