// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { deepReady } from '../../src/helpers/helpers'

Cypress.Commands.add('visitPage', (url: string) => {
  cy.visit(url)
  cy.get('bal-doc-app').then($app => {
    return new Cypress.Promise(resolve => {
      deepReady($app.get(0)).then(() => resolve())
    })
  })
})
