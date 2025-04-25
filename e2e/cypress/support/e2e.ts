// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-axe'

import 'cypress-file-upload'
import { addCompareSnapshotCommand } from './lib/visuals'

addCompareSnapshotCommand({
  capture: 'fullPage',
  errorThreshold: 0.3,
})

Cypress.Screenshot.defaults({
  onBeforeScreenshot($el) {
    if ($el.is('html')) {
      $el.css('overflow', 'hidden')
    }
  },
  onAfterScreenshot($el) {
    if ($el.is('html')) {
      $el.css('overflow', 'hidden scroll')
    }
  },
})

import './commands'
