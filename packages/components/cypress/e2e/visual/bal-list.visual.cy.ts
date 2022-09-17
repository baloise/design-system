import { byTestId } from '../../../../testing/src'

describe.only('List', () => {
  before(() => cy.page('/components/bal-list/test/bal-list.visual.html'))

  it('basic component', () => cy.get(byTestId('basic')).compareSnapshot('list-basic', 0.0))

  it('sizes variants', () => cy.get(byTestId('sizes')).compareSnapshot('list-sizes', 0.0))

  it('backgrounds variants', () => cy.get(byTestId('backgrounds')).compareSnapshot('list-backgrounds', 0.0))

  it('component variants', () => cy.compareSnapshot('list-variants', 0.0))
})
