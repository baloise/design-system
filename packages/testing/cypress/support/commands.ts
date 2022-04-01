// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload'
import '../../src'

import * as compareSnapshotCommand from 'cypress-visual-regression/dist/command'
import { deepReady } from '@baloise/design-system-components'

const compareSnapshotCommandAsAny = compareSnapshotCommand as any
compareSnapshotCommandAsAny({
  capture: 'fullPage',
})

Cypress.Commands.add('visitPage', (url: string) => {
  cy.visit(url)
  cy.get('bal-doc-app').then(async $app => {
    await deepReady($app.get(0))
  })
})
