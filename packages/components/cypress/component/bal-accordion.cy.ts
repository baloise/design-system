import { BalAccordion } from '../../.storybook/vue/generated/components'

describe('bal-accordion', () => {
  beforeEach(() => {
    cy.mount(BalAccordion, {
      props: {
        openLabel: 'OPEN LABEL',
        closeLabel: 'CLOSE LABEL',
      },
      slots: { default: () => 'TEST CONTENT' },
    })

    cy.disableAnimation()
    cy.get('bal-accordion').waitForComponents()
  })

  it('should have labels', () => {
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
    cy.get('@balChange').shouldHaveEventDetail(true)
  })

  it('should call balChange when open ', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalAccordion, {
      props: {
        value: true,
        closeLabel: 'CLOSE LABEL',
        onBalChange: onBalChangeSpy,
      },
    })

    cy.get('bal-accordion').contains('CLOSE LABEL')
    cy.get('bal-button').click()
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail(false)
  })
})
