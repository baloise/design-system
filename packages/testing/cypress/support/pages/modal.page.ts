import { byTestId } from '../../../src'

export class ModalPage {
  modal = byTestId('modal')
  openModalButton = byTestId('open-modal-button')
  closeModalButton = byTestId('open-modal-close')

  open() {
    cy.visit('/components/notice/bal-modal')
  }
}
