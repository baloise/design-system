import { DsFooter, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('renders content and legal text', async ({ page }) => {
    await page.mount(`
      <ds-footer legal-text="Test Legal Text">
        <p>Footer Content</p>
      </ds-footer>
    `)

    const footer = new DsFooter(page.locator('ds-footer'))

    await expect(footer.el).toContainText('Footer Content')
    await footer.assertLegalTextContains('Test Legal Text')
  })
})

test.describe('dsLanguageChange', () => {
  test('emits dsLanguageChange with correct detail', async ({ page }) => {
    await page.mount(`<ds-footer></ds-footer>`)

    const footer = new DsFooter(page.locator('ds-footer'))
    const languageChangeSpy = await footer.el.spyOnEvent('dsLanguageChange')

    await footer.selectLanguage('fr')

    expect(languageChangeSpy).toHaveReceivedEventTimes(1)
    expect(languageChangeSpy).toHaveReceivedEventDetail({ language: 'fr' })
  })
})

test.describe('props', () => {
  test('renders language select by default', async ({ page }) => {
    await page.mount(`<ds-footer></ds-footer>`)

    const footer = new DsFooter(page.locator('ds-footer'))

    await footer.assertLanguageSelectVisible()
  })

  test('hides language select when hide-language-selection is set', async ({ page }) => {
    await page.mount(`<ds-footer hide-language-selection></ds-footer>`)

    const footer = new DsFooter(page.locator('ds-footer'))

    await footer.assertLanguageSelectHidden()
  })

  test('hides links when hide-links is set', async ({ page }) => {
    await page.mount(`
      <ds-footer hide-links>
        <a slot="links" href="/impressum">Impressum</a>
      </ds-footer>
    `)

    const footer = new DsFooter(page.locator('ds-footer'))

    await footer.assertLinksCount(0)
  })

  test('renders social links when show-social-media is set', async ({ page }) => {
    await page.mount(`
      <ds-footer show-social-media>
        <a slot="social-links" href="https://www.linkedin.com" aria-label="LinkedIn">
          <ds-icon name="linkedin"></ds-icon>
        </a>
      </ds-footer>
    `)

    const footer = new DsFooter(page.locator('ds-footer'))

    await footer.assertSocialLinksCount(1)
  })

  test('renders override links when no slotted links are provided', async ({ page }) => {
    await page.mount(`<ds-footer id="footer"></ds-footer>`)

    await page.evaluate(() => {
      const footer = document.getElementById('footer') as any
      footer.overrideLinks = [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
      ]
    })

    const footer = new DsFooter(page.locator('ds-footer'))

    await footer.assertLinksCount(2)
    await expect(footer.links().first()).toContainText('Impressum')
  })
})

test.describe('methods', () => {
  test('configChanged updates allowed language options', async ({ page }) => {
    await page.mount(`<ds-footer></ds-footer>`)

    await page.evaluate(async () => {
      const footer = document.querySelector('ds-footer') as any

      await footer.configChanged({
        language: 'de',
        region: 'ch',
        allowedLanguages: ['de', 'fr'],
      })
    })

    const footer = new DsFooter(page.locator('ds-footer'))

    await expect(footer.languageSelect.locator('option')).toHaveCount(2)
    await expect(footer.languageSelect).toHaveValue('de')
  })
})
