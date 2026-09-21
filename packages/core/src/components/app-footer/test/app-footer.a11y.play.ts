import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`
    <ds-app-footer>
      <p>Footer Content</p>
      <a slot="links" href="/impressum">Impressum</a>
      <a slot="links" href="/privacy">Datenschutz</a>
      <a slot="social-links" href="https://www.linkedin.com" aria-label="LinkedIn">
        <ds-icon name="linkedin"></ds-icon>
      </a>
    </ds-app-footer>
  `)

  await a11y('ds-app-footer')
})
