import { dataTestSelector } from '../../../src'

export class TextareaPage {
  textarea = dataTestSelector('textarea')
  textareaDisabled = dataTestSelector('textarea-disabled')

  open() {
    cy.visit('/components/bal-textarea')
  }
}
