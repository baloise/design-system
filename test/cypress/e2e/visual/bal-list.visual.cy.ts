describe('bal-list', () => {
  beforeEach(() => cy.visit('/components/bal-list/test/bal-list.visual.html').waitForDesignSystem())

  it('basic component', () => cy.getByTestId('basic').compareSnapshot('list-basic'))

  it('sizes variants', () => cy.getByTestId('sizes').compareSnapshot('list-sizes'))

  it('backgrounds variants', () => cy.getByTestId('backgrounds').compareSnapshot('list-backgrounds'))

  it('component variants', () => cy.compareSnapshot('list-variants'))
})
