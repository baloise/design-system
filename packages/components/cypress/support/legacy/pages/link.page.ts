import { LinkAccessor, byTestId } from '../../../../../testing/src'

export class LinkPage {
  link = LinkAccessor(byTestId('link'))
  linkButton = LinkAccessor(byTestId('button-link'))
  open() {
    cy.page('/components/bal-button')
  }
}
