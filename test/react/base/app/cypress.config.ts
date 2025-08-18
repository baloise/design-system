import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,

  viewportWidth: 1024,
  viewportHeight: 1280,

  env: {
    failSilently: false,
  },

  includeShadowDom: true,

  e2e: {
    baseUrl: 'http://localhost:4200/',
  },
})
