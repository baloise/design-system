import { defineConfig } from 'cypress'

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,

  viewportWidth: 1024,
  viewportHeight: 1280,

  env: {
    failSilently: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/snapshots',
  },

  includeShadowDom: true,

  e2e: {
    baseUrl: 'http://localhost:4200/',
  },
})
