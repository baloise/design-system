import { DsApp, expect, test } from '@baloise/ds-playwright'

test.describe('legacy ds-app alias', () => {
  test('still applies brand, region and language to the global config', async ({ page }) => {
    await page.mount(`
      <ds-app
        data-testid="target-app"
        brand="baloise"
        region="DE"
        language="fr"
        allowed-languages="fr,en"
        fallback-language="en"
      ></ds-app>
    `)

    const state = await page.evaluate(() => {
      const config = (window as any).DesignSystem.config
      return {
        brand: config.brand,
        region: config.region,
        language: config.language,
        allowedLanguages: config.allowedLanguages,
        fallbackLanguage: config.fallbackLanguage,
      }
    })

    expect(state).toEqual({
      brand: 'baloise',
      region: 'DE',
      language: 'fr',
      allowedLanguages: ['fr', 'en'],
      fallbackLanguage: 'en',
    })
  })

  test('still emits dsLanguageChange when language changes after mount', async ({ page }) => {
    await page.mount(`
      <ds-app data-testid="target-app" language="de" allowed-languages="de,fr"></ds-app>
    `)

    const app = new DsApp(page.locator('[data-testid="target-app"]'))
    const languageSpy = await app.el.spyOnEvent('dsLanguageChange')

    await page.evaluate(() => {
      const target = document.querySelector('[data-testid="target-app"]') as any
      target.language = 'fr'
    })

    const language = await page.evaluate(() => (window as any).DesignSystem.config.language)

    expect(language).toBe('fr')
    expect(languageSpy).toHaveReceivedEventTimes(1)
    expect(languageSpy).toHaveReceivedEventDetail('fr')
  })
})
