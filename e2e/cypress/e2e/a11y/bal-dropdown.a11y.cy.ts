import { selectors } from 'support/utils'

describe('bal-dropdown', () => {
  beforeEach(() => {
    cy.pageA11y('/components/bal-dropdown/test/bal-dropdown.a11y.html')
    cy.platform('desktop')
    cy.waitForDesignSystem()
  })

  it('closed state', () => {
    cy.get('main').testA11y()
  })

  it('open state', () => {
    cy.getByLabelText('Year').click()
    cy.get('main').testA11y()
    cy.getByRole('option', { name: 'v1990' }).click()
    cy.get('main').testA11y()
  })
})
