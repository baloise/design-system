import { RadioAccessor, dataTestSelector } from '../../../src'

export class RadioPage {
  radio = RadioAccessor(dataTestSelector('radio'))
  selectButton = RadioAccessor(dataTestSelector('select-button'))

  open() {
    cy.visit('/components/bal-radio')
  }
}
