import { RadioAccessor, dataTestSelector } from '../../../src'

export class RadioPage {
  radio = RadioAccessor(dataTestSelector("radio"))
  open() {
    cy.visit('/components/bal-radio')
  }
}
