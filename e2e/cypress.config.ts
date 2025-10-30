import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'
import cypressTerminalReport from 'cypress-terminal-report/src/installLogsPrinter'
import { configureVisualRegression } from './cypress/support/lib/visuals'

export default defineConfig({
  video: false,

  trashAssetsBeforeRuns: true,
  includeShadowDom: true,

  viewportWidth: 1024,
  viewportHeight: 1280,

  e2e: {
    baseUrl: 'http://localhost:3333/',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/snapshots/actual',
    env: {
      visualRegression: {
        baseDirectory: 'cypress/snapshots/base/visual',
        diffDirectory: 'cypress/snapshots/diff',
        generateDiff: 'always',
        failSilently: false,
      },
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      configureVisualRegression(on, config)
      cypressTerminalReport(on)
      return config
    },
  },

  component: {
    devServer: {
      bundler: 'vite',
    },
  },
})
