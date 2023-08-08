import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,

  includeShadowDom: true,

  viewportWidth: 1024,
  viewportHeight: 1280,

  env: {
    failSilently: false,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)
    },
    baseUrl: 'http://localhost:3333/',
    // excludeSpecPattern: '**/node_modules/**',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
