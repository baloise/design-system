import { byTestId } from '../../../../testing/src'

describe('bal-stage', () => {
  it('basic component', () => {
    cy.page('/components/bal-stage/test/bal-stage.visual.html')

    cy.platform('desktop')
    cy.get(byTestId('basic')).compareSnapshot('stage-basic', 0.0)

    cy.platform('tablet')
    cy.get(byTestId('basic')).compareSnapshot('stage-basic-tablet', 0.0)

    cy.platform('mobile')
    cy.get(byTestId('basic')).compareSnapshot('stage-basic-mobile', 0.0)
  })

  it('large stage', () => {
    cy.page('/components/bal-stage/test/bal-stage.large.visual.html')

    cy.platform('desktop')
    cy.get(byTestId('large')).compareSnapshot('stage-large', 0.0)

    cy.platform('tablet')
    cy.get(byTestId('large')).compareSnapshot('stage-large-tablet', 0.0)

    cy.platform('mobile')
    cy.get(byTestId('large')).compareSnapshot('stage-large-mobile', 0.0)
  })
})
