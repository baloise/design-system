import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'
import cypressSplit from 'cypress-split'

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

  includeShadowDom: true,

  e2e: {
    baseUrl: 'http://localhost:3333/',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      getCompareSnapshotsPlugin(on, config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
