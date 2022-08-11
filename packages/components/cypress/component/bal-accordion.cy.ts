import { BalAccordion } from '../../.storybook/vue/components'

describe('bal-accordion.cy.ts', () => {
  it('should have labels', () => {
    cy.mount(BalAccordion, {
      props: {
        openLabel: 'OPEN LABEL',
        closeLabel: 'CLOSE LABEL',
      },
      slots: { default: () => 'TEST CONTENT' },
    })
    cy.get('bal-accordion').contains('TEST CONTENT')
    cy.get('bal-accordion').contains('OPEN LABEL')
    cy.get('bal-button').click()
    cy.get('bal-accordion').contains('CLOSE LABEL')
  })
  it('should call balChange when open ', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalAccordion, {
      props: {
        onBalChange: onBalChangeSpy,
      },
    })
    cy.get('bal-button').click()
    cy.get('@balChange').should('have.been.calledOnce')
  })
})
