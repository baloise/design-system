import { deepReady } from '@baloise/design-system-components'
import { byTestId } from '../../../src'

export class ButtonPage {
  primaryButton = byTestId('primary-button')
  primaryButtonDisabled = byTestId('primary-button-disabled')

  open(done: any) {
    cy.visit('/components/bal-button')
    cy.get('bal-app').then(async $app => {
      await deepReady($app.get(0))
      if (done) {
        done()
      }
    })
  }
}
