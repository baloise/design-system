import { byTestId } from '../../../../testing/src'

export class TextareaPage {
  textarea = byTestId('textarea')
  textareaDisabled = byTestId('textarea-disabled')

  open() {
    cy.visit('/components/form/bal-textarea')
  }
}
