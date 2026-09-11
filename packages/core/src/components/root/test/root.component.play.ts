import { DsRoot, expect, test } from '@baloise/ds-playwright'

test.describe('props', () => {
  test('applies brand, region, language, allowedLanguages and fallbackLanguage to the global config', async ({
    page,
  }) => {
    await page.mount(`
      <ds-root
        data-testid="target-root"
        brand="baloise"
        region="DE"
        language="fr"
        allowed-languages="fr,en"
        fallback-language="en"
      ></ds-root>
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
      <ds-root data-testid="target-root" language="it" allowed-languages="de,fr" fallback-language="fr"></ds-root>
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
      <ds-root data-testid="target-root" language="de" allowed-languages="de,fr"></ds-root>
    `)

    const root = new DsRoot(page.locator('[data-testid="target-root"]'))
    const languageSpy = await root.el.spyOnEvent('dsLanguageChange')

    await page.evaluate(() => {
      const target = document.querySelector('[data-testid="target-root"]') as any
      target.language = 'fr'
    })

    const language = await page.evaluate(() => (window as any).DesignSystem.config.language)

    expect(language).toBe('fr')
    expect(languageSpy).toHaveReceivedEventTimes(1)
    expect(languageSpy).toHaveReceivedEventDetail('fr')
  })

  test('propagates a brand change made after mount to the global config', async ({ page }) => {
    await page.mount(`<ds-root data-testid="target-root" brand="helvetia"></ds-root>`)

    await page.evaluate(() => {
      const target = document.querySelector('[data-testid="target-root"]') as any
      target.brand = 'baloise'
    })

    const brand = await page.evaluate(() => (window as any).DesignSystem.config.brand)

    expect(brand).toBe('baloise')
  })
})

test.describe('configChanged', () => {
  test('emits a change event only for fields that actually changed', async ({ page }) => {
    await page.mount(`<ds-root data-testid="target-root"></ds-root>`)

    const root = new DsRoot(page.locator('[data-testid="target-root"]'))

    const animatedSpy = await root.el.spyOnEvent('dsAnimatedChange')
    const brandSpy = await root.el.spyOnEvent('dsBrandChange')
    const regionSpy = await root.el.spyOnEvent('dsRegionChange')
    const languageSpy = await root.el.spyOnEvent('dsLanguageChange')
    const allowedLanguagesSpy = await root.el.spyOnEvent('dsAllowedLanguagesChange')
    const fallbackLanguageSpy = await root.el.spyOnEvent('dsFallbackLanguageChange')

    await page.evaluate(async () => {
      const target = document.querySelector('[data-testid="target-root"]') as any
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
      const target = document.querySelector('[data-testid="target-root"]') as any
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
      const target = document.querySelector('[data-testid="target-root"]') as any
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
