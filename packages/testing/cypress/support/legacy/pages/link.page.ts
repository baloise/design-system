import { LinkAccessor, byTestId } from '../../../../src'

export class LinkPage {
  link = LinkAccessor(byTestId('link'))
  linkButton = LinkAccessor(byTestId('button-link'))
  open() {
    cy.visit('/components/bal-button')
  }
}
