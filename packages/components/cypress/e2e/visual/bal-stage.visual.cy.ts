import { byTestId } from '../../../../testing/src'

describe('bal-stage', () => {
  it('basic component', () => {
    cy.page('/components/bal-stage/test/bal-stage.visual.html')
    cy.get(byTestId('basic')).compareSnapshot('stage-basic', 0.0)
  })

  it('large stage', () => {
    cy.page('/components/bal-stage/test/bal-stage.large.visual.html')
    cy.get(byTestId('large')).compareSnapshot('stage-large', 0.0)
  })
})
