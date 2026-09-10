import { DsApp, expect, test } from '@baloise/ds-playwright'

test.describe('props', () => {
  test('applies brand, region, language, allowedLanguages and fallbackLanguage to the global config', async ({
    page,
  }) => {
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

  test('falls back to fallbackLanguage when language is not part of allowedLanguages', async ({ page }) => {
    await page.mount(`
      <ds-app data-testid="target-app" language="it" allowed-languages="de,fr" fallback-language="fr"></ds-app>
    `)

    const language = await page.evaluate(() => (window as any).DesignSystem.config.language)

    expect(language).toBe('fr')
  })
})

test.describe('runtime prop changes', () => {
  test('propagates a language change made after mount to the global config and emits dsLanguageChange', async ({
    page,
  }) => {
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

  test('propagates a brand change made after mount to the global config', async ({ page }) => {
    await page.mount(`<ds-app data-testid="target-app" brand="helvetia"></ds-app>`)

    await page.evaluate(() => {
      const target = document.querySelector('[data-testid="target-app"]') as any
      target.brand = 'baloise'
    })

    const brand = await page.evaluate(() => (window as any).DesignSystem.config.brand)

    expect(brand).toBe('baloise')
  })
})

test.describe('configChanged', () => {
  test('emits a change event only for fields that actually changed', async ({ page }) => {
    await page.mount(`<ds-app data-testid="target-app"></ds-app>`)

    const app = new DsApp(page.locator('[data-testid="target-app"]'))

    const animatedSpy = await app.el.spyOnEvent('dsAnimatedChange')
    const brandSpy = await app.el.spyOnEvent('dsBrandChange')
    const regionSpy = await app.el.spyOnEvent('dsRegionChange')
    const languageSpy = await app.el.spyOnEvent('dsLanguageChange')
    const allowedLanguagesSpy = await app.el.spyOnEvent('dsAllowedLanguagesChange')
    const fallbackLanguageSpy = await app.el.spyOnEvent('dsFallbackLanguageChange')

    await page.evaluate(async () => {
      const target = document.querySelector('[data-testid="target-app"]') as any
      await target.configChanged({
        animated: true,
        brand: 'baloise',
        region: 'DE',
        language: 'fr',
        allowedLanguages: ['fr'],
        fallbackLanguage: 'en',
      })
    })

    expect(animatedSpy).toHaveReceivedEventTimes(1)
    expect(brandSpy).toHaveReceivedEventTimes(1)
    expect(regionSpy).toHaveReceivedEventTimes(1)
    expect(languageSpy).toHaveReceivedEventTimes(1)
    expect(allowedLanguagesSpy).toHaveReceivedEventTimes(1)
    expect(fallbackLanguageSpy).toHaveReceivedEventTimes(1)

    expect(brandSpy).toHaveReceivedEventDetail('baloise')
    expect(regionSpy).toHaveReceivedEventDetail('DE')
    expect(languageSpy).toHaveReceivedEventDetail('fr')
    expect(allowedLanguagesSpy).toHaveReceivedEventDetail(['fr'])
    expect(fallbackLanguageSpy).toHaveReceivedEventDetail('en')

    // Same values again: nothing changed, so no new events.
    await page.evaluate(async () => {
      const target = document.querySelector('[data-testid="target-app"]') as any
      await target.configChanged({
        animated: true,
        brand: 'baloise',
        region: 'DE',
        language: 'fr',
        allowedLanguages: ['fr'],
        fallbackLanguage: 'en',
      })
    })

    expect(animatedSpy).toHaveReceivedEventTimes(1)
    expect(brandSpy).toHaveReceivedEventTimes(1)
    expect(regionSpy).toHaveReceivedEventTimes(1)
    expect(languageSpy).toHaveReceivedEventTimes(1)
    expect(allowedLanguagesSpy).toHaveReceivedEventTimes(1)
    expect(fallbackLanguageSpy).toHaveReceivedEventTimes(1)

    // Only the brand changes: only dsBrandChange should fire again.
    await page.evaluate(async () => {
      const target = document.querySelector('[data-testid="target-app"]') as any
      await target.configChanged({
        animated: true,
        brand: 'helvetia',
        region: 'DE',
        language: 'fr',
        allowedLanguages: ['fr'],
        fallbackLanguage: 'en',
      })
    })

    expect(brandSpy).toHaveReceivedEventTimes(2)
    expect(brandSpy).toHaveReceivedEventDetail('helvetia')
    expect(animatedSpy).toHaveReceivedEventTimes(1)
    expect(regionSpy).toHaveReceivedEventTimes(1)
    expect(languageSpy).toHaveReceivedEventTimes(1)
    expect(allowedLanguagesSpy).toHaveReceivedEventTimes(1)
    expect(fallbackLanguageSpy).toHaveReceivedEventTimes(1)
  })
})
