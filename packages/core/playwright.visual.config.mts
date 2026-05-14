/**
* This configuration is used to run visual tests for a specific
* component across multiple devices and browsers.
*/
import { defineConfig, devices } from '@playwright/test'
import baseConfig from './playwright.config'

const TAG = 'tag'
const testMatch = ['src/components/' + TAG + '/test/*visual.play.ts']

console.log('testMatch', testMatch)

export default defineConfig({
  ...baseConfig,
  projects: [
    {
      name: '🖼️ Visual / 💻 Desktop Chrome',
      testMatch,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: '🖼️ Visual / 📱 Mobile Chrome',
      testMatch,
      use: { ...devices['Pixel 5'] },
    },
  ],
})
