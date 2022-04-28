import { byTestId } from '../../../../testing/src'

export class TextareaPage {
  textarea = byTestId('textarea')
  textareaDisabled = byTestId('textarea-disabled')

  open() {
    cy.page('/components/form/bal-textarea')
  }
}
