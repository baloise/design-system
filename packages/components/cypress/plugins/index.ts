/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

export default function configurePlugins(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  getCompareSnapshotsPlugin(on, config)
}
