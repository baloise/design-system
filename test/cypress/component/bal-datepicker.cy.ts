import { tr } from 'date-fns/locale'
import { BalDatepicker } from '../support/utils'
import { format, now } from '@baloise/web-app-utils'

describe('bal-datepicker.cy.ts', () => {
  beforeEach(() => {
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
    cy.waitForDesignSystem()
  })
  it('should open last available month if month from defaultDate is bigger that max month', () => {
    cy.mount(BalDatepicker, {
      props: {
        defaultDate: '2023-04-12',
        min: '2023-01-12',
        max: '2024-02-28',
      },
    })
    cy.waitForDesignSystem()

    cy.get('bal-datepicker')
      .click()
      .waitForComponents()
      .find('.bal-datepicker-pagination__month-and-year__select--year select')
      .select(1)
      .waitForComponents()

    cy.get('bal-datepicker')
      .find('.bal-datepicker-grid__row .bal-datepicker-grid__cell')
      .first()
      .should('not.be.disabled')
  })
  it('should fire balChange when field is cleared', () => {
    const onBalChangeSpy = cy.spy().as('balChange')
    cy.mount(BalDatepicker, {
      props: {
        onBalChange: onBalChangeSpy,
        defaultDate: '2023-04-12',
        min: '2023-01-12',
        max: '2024-02-28',
        value: '2023-02-20',
      },
    })
    cy.waitForDesignSystem()

    cy.get('bal-datepicker')
      .click()
      .waitForComponents()
      .find('input.input')
      .clear({ force: true })
      .blur()
      .waitForComponents()

    cy.get('@balChange').should('have.been.calledOnce')
  })
  it('should change value through manual input', () => {
    cy.get('bal-datepicker')
      .find('input.input')
      .type('{0}')
      .type('{2}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{1}')
      .type('{9}')
      .type('{8}')
      .type('{8}')
      .type('{enter}')
      .blur({ force: true })

    cy.get('bal-datepicker').find('input.input').should('have.value', '02.01.1988')

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balBlur').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 10)
  })
  it('should automatically add the separators and change value through manual input', () => {
    cy.get('bal-datepicker')
      .find('input.input')
      .type('{0}')
      .type('{2}')
      .type('{0}')
      .type('{1}')
      .type('{1}')
      .type('{9}')
      .type('{8}')
      .type('{8}')
      .type('{enter}')
    cy.get('bal-datepicker').find('input.input').should('have.value', '02.01.1988')
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balFocus').should('have.been.calledOnce')
    cy.get('@balInput').should('have.been.callCount', 8)
  })
  it('should select the date of today', () => {
    cy.get('bal-datepicker').find('input.input').click()
    cy.get('bal-datepicker').find('.bal-datepicker-grid__cell--today').click()
    cy.get('bal-datepicker').find('input.input').should('have.value', format('de-CH', now()))
    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balInput').should('not.have.been.called')
  })
  it('should fire balChange when the empty is set to nothing', () => {
    cy.get('bal-datepicker').find('input.input').should('have.value', '')
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balInput').should('not.have.been.called')
  })
  it.skip('should turn short date into a full date', () => {
    // TODO: should turn short date into a full date
    cy.get('bal-datepicker')
      .find('input.input')
      .type('{2}')
      .type('{.}')
      .type('{2}')
      .type('{.}')
      .type('{1}')
      .type('{enter}')
    cy.get('bal-datepicker').find('input.input').should('have.value', '02.02.2001')
    cy.get('@balChange').should('have.been.calledOnce')
  })
  it('should be disabled', () => {
    cy.mount(BalDatepicker, {
      props: {
        disabled: true,
      },
    })
    cy.get('bal-datepicker').find('input.input').should('be.disabled')
  })
  it('should had disabled dates before min date', () => {
    cy.mount(BalDatepicker, {
      props: {
        min: '2023-01-10',
      },
    })
    cy.get('bal-datepicker')
      .find('input.input')
      .type('{0}')
      .type('{9}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(0).should('be.disabled')
    cy.get('bal-datepicker')
      .find('input.input')
      .clear()
      .type('{1}')
      .type('{0}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(1).should('not.be.disabled')
    cy.get('bal-datepicker')
      .find('input.input')
      .clear()
      .type('{1}')
      .type('{1}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(2).should('not.be.disabled')
  })
  it('should not fire change event when clicking on disabled date', () => {
    cy.mount(BalDatepicker, {
      props: {
        min: '2023-01-10',
      },
    })
    cy.get('bal-datepicker')
      .find('input.input')
      .clear()
      .type('{0}')
      .type('{9}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(0).click({ force: true })
    cy.get('@balChange').should('not.have.been.called')
  })
  it('should had disabled dates after max date', () => {
    cy.mount(BalDatepicker, {
      props: {
        max: '2023-01-10',
      },
    })
    cy.get('bal-datepicker')
      .find('input.input')
      .type('{9}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(0).should('not.be.disabled')
    cy.get('bal-datepicker')
      .find('input.input')
      .clear()
      .type('{1}')
      .type('{0}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(1).should('not.be.disabled')
    cy.get('bal-datepicker')
      .find('input.input')
      .clear()
      .type('{1}')
      .type('{1}')
      .type('{.}')
      .type('{0}')
      .type('{1}')
      .type('{.}')
      .type('{2}')
      .type('{0}')
      .type('{2}')
      .type('{3}')
      .type('{enter}')
    cy.get('bal-datepicker').find('.bal-datepicker-grid__row').eq(2).find('button').eq(2).should('be.disabled')
  })
  it('should have set max year to the provided one', () => {
    cy.mount(BalDatepicker, {
      props: {
        maxYearProp: 2023,
      },
    })
    cy.get('bal-datepicker')
      .find('.bal-datepicker-pagination__month-and-year__select--year')
      .find('select > option')
      .last()
      .should('have.value', '2023')
      .should('not.have.value', '2024')
  })
  it('should have set min year to the provided one', () => {
    cy.mount(BalDatepicker, {
      props: {
        minYearProp: 2000,
      },
    })
    cy.get('bal-datepicker')
      .find('.bal-datepicker-pagination__month-and-year__select--year')
      .find('select > option')
      .first()
      .should('have.value', '2000')
      .should('not.have.value', '1999')
  })
})
