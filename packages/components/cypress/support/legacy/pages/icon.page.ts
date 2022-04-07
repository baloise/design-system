import { IconAccessor, byTestId } from '../../../../../testing/src'

export class IconPage {
  icon = IconAccessor(byTestId('icon'))
  open() {
    cy.visit('/components/bal-icon')
  }
}
