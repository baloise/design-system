import { dataTestSelector } from '../../../src'

export class ModalPage {
  modal = dataTestSelector('modal')
  openModalButton = dataTestSelector('open-modal-button')
  closeModalButton = dataTestSelector('open-modal-close')

  open() {
    cy.visit('/components/notice/bal-modal')
  }
}
