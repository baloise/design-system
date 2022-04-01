import { byTestId } from '../../../src'

describe('Visual Regression Tests', () => {
  describe('Tag', () => {
    before(() => cy.visitPage('/components/bal-tag/test/bal-tag.visual.html'))
    it('basic component', () => cy.compareSnapshot('tag-basic', 0.0))
    it('component variants', () => cy.get(byTestId('basic')).compareSnapshot('tag-variants', 0.0))
  })
})
