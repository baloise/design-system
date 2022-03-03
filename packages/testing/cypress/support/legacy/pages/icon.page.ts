import { IconAccessor, byTestId } from '../../../../src'

export class IconPage {
  icon = IconAccessor(byTestId('icon'))
  open() {
    cy.visit('/components/bal-icon')
  }
}
