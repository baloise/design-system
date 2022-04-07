// ***********************************************************
// This example support/index.js is processed and
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
import './commands'
import './commands.types'

import '../../../testing/src'

import 'cypress-file-upload'

import * as compareSnapshotCommand from 'cypress-visual-regression/dist/command'
const compareSnapshotCommandAsAny = compareSnapshotCommand as any
compareSnapshotCommandAsAny({
  capture: 'fullPage',
})

import * as installLogsCollector from 'cypress-terminal-report/src/installLogsCollector'
const installLogs = installLogsCollector as any
installLogs()
