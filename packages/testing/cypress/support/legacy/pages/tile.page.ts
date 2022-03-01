import { TileAccessor, byTestId } from '../../../../src'

export class TilePage {
  tile = TileAccessor(byTestId('card'))
  open() {
    cy.visit('/components/bal-card')
  }
}
