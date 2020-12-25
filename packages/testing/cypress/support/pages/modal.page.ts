import { ModalButtonAccessor, dataTestSelector } from '../../../src'

export class ModalPage {
  modal = ModalButtonAccessor(dataTestSelector("modal"))
  openModal = ModalButtonAccessor(dataTestSelector('open-modal-button'));
  open() {
    cy.visit('/components/bal-modal')
  }

  clickOpenModalButton() {
    this.openModal
      .get()
      .click();
    return this;
  }

  assertBigModalContent(content: string) {
    this.modal
      .get()
      .contains(content);
    return this;
  }
}
