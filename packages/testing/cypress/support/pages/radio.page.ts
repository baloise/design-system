import { dataTestSelector } from '../../../src'

export class RadioPage {
  radio = dataTestSelector('radio')
  selectButton = dataTestSelector('select-button')

  open() {
    cy.visit('/components/form/bal-radio')
  }
}
