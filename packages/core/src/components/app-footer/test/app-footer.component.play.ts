import { DsAppFooter, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('renders content and legal text', async ({ page }) => {
    await page.mount(`
      <ds-app-footer legal-text="Test Legal Text">
        <p>Footer Content</p>
      </ds-app-footer>
    `)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await expect(footer.el).toContainText('Footer Content')
    await footer.assertLegalTextContains('Test Legal Text')
  })
})

test.describe('dsLanguageChange', () => {
  test('emits dsLanguageChange with correct detail', async ({ page }) => {
    await page.mount(`<ds-app-footer></ds-app-footer>`)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))
    const languageChangeSpy = await footer.el.spyOnEvent('dsLanguageChange')

    await footer.selectLanguage('fr')

    expect(languageChangeSpy).toHaveReceivedEventTimes(1)
    expect(languageChangeSpy).toHaveReceivedEventDetail({ language: 'fr' })
  })
})

test.describe('props', () => {
  test('renders language select by default', async ({ page }) => {
    await page.mount(`<ds-app-footer></ds-app-footer>`)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await footer.assertLanguageSelectVisible()
  })

  test('hides language select when hide-language-selection is set', async ({ page }) => {
    await page.mount(`<ds-app-footer hide-language-selection></ds-app-footer>`)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await footer.assertLanguageSelectHidden()
  })

  test('hides links when disableDefaultLinks is set', async ({ page }) => {
    await page.mount(`
      <ds-app-footer disable-default-links>
        <a slot="links" href="/impressum">Impressum</a>
      </ds-app-footer>
    `)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await footer.assertLinksCount(1)
  })

  test('renders social links when disable-default-social-links is set', async ({ page }) => {
    await page.mount(`
      <ds-app-footer disable-default-social-links>
        <a slot="social-links" href="https://www.linkedin.com" aria-label="LinkedIn">
          <ds-icon name="linkedin"></ds-icon>
        </a>
      </ds-app-footer>
    `)

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await footer.assertSocialLinksCount(1)
  })
})

test.describe('methods', () => {
  test('configChanged updates allowed language options', async ({ page }) => {
    await page.mount(`<ds-app-footer></ds-app-footer>`)

    await page.evaluate(async () => {
      const footer = document.querySelector('ds-app-footer') as any

      await footer.configChanged({
        language: 'de',
        region: 'ch',
        allowedLanguages: ['de', 'fr'],
      })
    })

    const footer = new DsAppFooter(page.locator('ds-app-footer'))

    await expect(footer.languageSelect.locator('option')).toHaveCount(2)
    await expect(footer.languageSelect).toHaveValue('de')
  })
})
