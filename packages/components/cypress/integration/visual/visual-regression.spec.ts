import { byTestId } from '../../../../testing/src'

describe.skip('Visual Regression Tests', () => {
  describe('Tag', () => {
    before(() => cy.pageVisual('/components/bal-tag/test/bal-tag.visual.html'))

    it('basic component', () => cy.get(byTestId('basic')).compareSnapshot('tag-basic', 0.0))
    it('component variants', () => cy.compareSnapshot('tag-variants', 0.0))
  })
})
