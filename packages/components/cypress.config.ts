import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'dnm1ky',
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,

  env: {
    failSilently: false,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./cypress/plugins/index.ts').default(on, config)
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
