import { defineConfig, devices, expect } from '@playwright/test'
import { nxE2EPreset } from '@nx/playwright/preset'
import { matchers } from '@baloise/ds-playwright'
import { workspaceRoot } from '@nx/devkit'

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4000'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  testMatch: '**/*.play.ts',
  // snapshotPathTemplate: '{testDir}/{testFileDir}/snapshots/{arg}__{projectName}{ext}',
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
    toHaveScreenshot: {
      threshold: 0.1,
    },
  },
  forbidOnly: !!process.env.CI,
  maxFailures: 0,
  /* Test retries help catch flaky tests on CI */
  retries: process.env.CI ? 2 : 0,
  reportSlowTests: null,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['github']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      testMatch: '**/*.visual.play.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      testMatch: '**/*.visual.play.ts',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      testMatch: '**/*.visual.play.ts',
      use: { ...devices['iPhone 12'] },
    },
  ],
})
