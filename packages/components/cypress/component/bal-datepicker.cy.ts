import { BalDatepicker } from '../../.storybook/vue/components'
import { format, now } from '@baloise/web-app-utils'

describe('bal-datepicker.cy.ts', () => {
  it('should change value through manual input', () => {
    const onBalChangeSpy = cy.spy().as('balChange')
    const onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        onBalInput: onBalInputSpy,
      },
    })

    cy.get('bal-datepicker')
      .find('input.input')
      .type('{2}')
      .type('{.}')
      .type('{1}')
      .type('{.}')
      .type('{1}')
      .type('{9}')
      .type('{8}')
      .type('{8}')
      .type('{enter}')

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 8)
  })

  it('should select the date of today', () => {
    const onBalChangeSpy = cy.spy().as('balChange')
    const onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        onBalInput: onBalInputSpy,
      },
    })

    cy.get('bal-datepicker').find('input.input').click()
    cy.get('bal-datepicker').find('.is-today').click()

    cy.get('bal-datepicker').find('input.input').should('have.value', format('de-CH', now()))
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should fire balChange when the empty is set to nothing', () => {
    const onBalChangeSpy = cy.spy().as('balChange')
    const onBalInputSpy = cy.spy().as('balInput')

    cy.mount(BalDatepicker, {
      props: {
        value: '',
        onBalChange: onBalChangeSpy,
        onBalInput: onBalInputSpy,
      },
    })

    cy.get('bal-datepicker').find('input.input').should('have.value', '')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })

  it('should turn short date into a full date', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
      },
    })

    cy.get('bal-datepicker')
      .find('input.input')
      .type('{2}')
      .type('{.}')
      .type('{2}')
      .type('{.}')
      .type('{1}')
      .type('{enter}')

    cy.get('@balChange').should('have.been.calledOnce')
  })

  it('should be disabled', () => {
    cy.mount(BalDatepicker, {
      props: {
        disabled: true,
      },
    })

    cy.get('bal-datepicker').find('input.input').should('have.attr', 'disabled')
  })
})
