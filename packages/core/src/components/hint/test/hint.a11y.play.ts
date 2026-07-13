import { test } from '@baloise/ds-playwright'

test('closed hint', async ({ page, a11y }) => {
  await page.mount(`
    <ds-hint>
      <ds-hint-title>Spider-Man</ds-hint-title>
      <ds-hint-text>Spider-Man is a superhero in Marvel Comics.</ds-hint-text>
    </ds-hint>
  `)
  await a11y('ds-hint')
})

test('open hint popup (desktop)', async ({ page, a11y }) => {
  await page.mount(`
    <ds-hint>
      <ds-hint-title>Spider-Man</ds-hint-title>
      <ds-hint-text>Spider-Man is a superhero in Marvel Comics.</ds-hint-text>
    </ds-hint>
  `)
  await page.evaluate(() => (document.querySelector('ds-hint') as any).present())
  await a11y('ds-hint')
})

test('hint with custom trigger label', async ({ page, a11y }) => {
  await page.mount(`
    <ds-hint trigger-label="Learn more about this topic">
      <ds-hint-title>Details</ds-hint-title>
      <ds-hint-text>More information about this topic.</ds-hint-text>
    </ds-hint>
  `)
  await a11y('ds-hint')
})

test('hint with raw slots', async ({ page, a11y }) => {
  await page.mount(`
    <ds-hint>
      <span slot="title">What is a deductible?</span>
      <p>A deductible is the amount you pay before insurance covers the rest.</p>
    </ds-hint>
  `)
  await a11y('ds-hint')
})
