import { test, waitForChanges } from '@baloise/ds-playwright'

test.beforeEach('Setup', async ({ page }) => {
  await page.mount(`
    <bal-accordion>
      <bal-accordion-summary>
        <bal-stack>
          <bal-content>
            <bal-label>Label</bal-label>
          </bal-content>
          <bal-accordion-trigger></bal-accordion-trigger>
        </bal-stack>
      </bal-accordion-summary>
      <bal-accordion-details>
        <p class="p-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </p>
      </bal-accordion-details>
    </bal-accordion>
  `)
})

test('collapsed', async ({ page, a11y }) => {
  await a11y('bal-accordion')
})

test('expanded', async ({ page, a11y }) => {
  await page.locator('bal-accordion').locator('bal-accordion-trigger').click()
  await waitForChanges(page)
  await a11y('bal-accordion')
})
