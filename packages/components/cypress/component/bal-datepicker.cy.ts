import { BalDatepicker } from '../../.storybook/vue/generated/components'
import { format, now } from '@baloise/web-app-utils'

describe('bal-datepicker.cy.ts', () => {
  it('should change value through manual input', () => {
    const onBalChangeSpy = cy.spy().as('balChange')
    const onBalInputSpy = cy.spy().as('balInput')
    const onBalFocusSpy = cy.spy().as('balFocus')
    const onBalBlurSpy = cy.spy().as('balBlur')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        onBalInput: onBalInputSpy,
        onBalFocus: onBalFocusSpy,
        onBalBlur: onBalBlurSpy,
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
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
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
    cy.get('bal-datepicker').find('.bal-datepicker-grid__cell--today').click()

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

  it('should had disabled dates before min date', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        min: '2023-01-10',
      },
    })

    cy.get('bal-datepicker')
      .find('input.input')
      .type('{2}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')

    cy.get('bal-datepicker')
      .find('.bal-datepicker-grid__row')
      .eq(1)
      .find('button')
      .eq(0)
      .should('have.attr', 'disabled')
  })

  it('should had disabled dates after max date', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        max: '2023-01-10',
      },
    })

    cy.get('bal-datepicker')
      .find('input.input')
      .type('{1}')
      .type('{5}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')

    cy.get('bal-datepicker')
      .find('.bal-datepicker-grid__row')
      .eq(2)
      .find('button')
      .eq(6)
      .should('have.attr', 'disabled')
  })

  it('should have set max year to the provided one', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        maxYearProp: 2023,
      },
    })

    cy.get('bal-datepicker')
      .find('.bal-datepicker-pagination__month-and-year__select--year')
      .find('select > option')
      .last()
      .should('have.value', '2023')
  })

  it('should have set min year to the provided one', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        minYearProp: 2000,
      },
    })

    cy.get('bal-datepicker')
      .find('.bal-datepicker-pagination__month-and-year__select--year')
      .find('select > option')
      .first()
      .should('have.value', '2000')
  })
})
