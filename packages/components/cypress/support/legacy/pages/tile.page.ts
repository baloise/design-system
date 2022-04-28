import { TileAccessor, byTestId } from '../../../../../testing/src'

export class TilePage {
  tile = TileAccessor(byTestId('card'))
  open() {
    cy.page('/components/bal-card')
  }
}
