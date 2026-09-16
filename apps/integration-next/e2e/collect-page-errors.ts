import { type Page } from '@playwright/test'

export function collectPageErrors(page: Page) {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error' || message.type() === 'warning') {
      errors.push(message.text())
    }
  })
  page.on('pageerror', error => {
    errors.push(error.message)
  })
  return errors
}
