import { devices } from '@playwright/test'
import { test } from './extend'

export function useDesktop() {
  test.use({ ...devices['Desktop Chrome'], ...devices['Desktop Safari'] })
}
