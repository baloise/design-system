import { byTestId } from '../../../../testing/src'

describe('bal-tag', () => {
  before(() => cy.page('/components/bal-tag/test/bal-tag.visual.html'))

  it('basic component', () => cy.get(byTestId('basic')).compareSnapshot('tag-basic', 0.0))
  it('component variants', () => cy.compareSnapshot('tag-variants', 0.0))
})
