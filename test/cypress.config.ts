import { defineConfig } from 'cypress'
import { configureVisualRegression } from 'cypress-visual-regression'
import cypressSplit from 'cypress-split'

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
        type: 'regression',
        baseDirectory: 'cypress/snapshot/base',
        diffDirectory: 'cypress/snapshot/diff',
        generateDiff: 'always',
        failSilently: true,
      },
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      configureVisualRegression(on, config)
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
