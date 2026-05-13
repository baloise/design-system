import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<a class="link" href="/components/link/test/link.style.html">Link</a>`)
  await a11y('a')
})
