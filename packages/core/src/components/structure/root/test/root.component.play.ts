import { DsRoot, expect, test } from '@helvetia-design/playwright'

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

  test('applies icons, legalLinks, legalText, and socialLinks to the global config', async ({ page }) => {
    await page.mount(`<ds-root data-testid="target-root"></ds-root>`)

    const icons = { custom: '<svg />' }
    const legalLinks = { CH: { de: [{ href: 'https://example.com', label: 'Legal' }] } }
    const legalText = { CH: { de: 'Copyright' } }
    const socialLinks = { CH: [{ href: 'https://example.com', label: 'X', icon: 'x', ariaLabel: 'X' }] }

    await page.evaluate(
      ({ icons, legalLinks, legalText, socialLinks }) => {
        const target = document.querySelector('[data-testid="target-root"]') as any
        target.icons = icons
        target.legalLinks = legalLinks
        target.legalText = legalText
        target.socialLinks = socialLinks
      },
      { icons, legalLinks, legalText, socialLinks },
    )

    const state = await page.evaluate(() => {
      const config = (window as any).DesignSystem.config
      return {
        icons: config.icons,
        legalLinks: config.legalLinks,
        legalText: config.legalText,
        socialLinks: config.socialLinks,
      }
    })

    expect(state.icons).toEqual(expect.objectContaining(icons))
    expect(state.legalLinks).toEqual(legalLinks)
    expect(state.legalText).toEqual(legalText)
    expect(state.socialLinks).toEqual(socialLinks)
  })
})

test.describe('precedence', () => {
  test('a config value set before mount (meta tag / initializeDesignSystem) is preserved when a nested ds-root has no matching prop', async ({
    page,
  }) => {
    // The outer app-shell <ds-root animated="false"> from page.mount() already ran its fallback
    // init by the time this resolves, so the global config exists with its defaults.
    await page.mount(`<div data-testid="target-root"></div>`)

    // Simulate the result of an app calling `initializeDesignSystem({ region: 'DE' })` (or
    // configuring it via the meta tag) before any other <ds-root> mounts.
    await page.evaluate(() => {
      ;(window as any).DesignSystem.config.region = 'DE'
    })

    expect(await page.evaluate(() => (window as any).DesignSystem.config.region)).toBe('DE')

    // A second, nested <ds-root> with no `region` attribute must not reset it back to the default.
    await page.evaluate(() => {
      const root = document.createElement('ds-root')
      root.setAttribute('data-testid', 'inner-root')
      document.querySelector('[data-testid="target-root"]')!.appendChild(root)
    })

    expect(await page.evaluate(() => (window as any).DesignSystem.config.region)).toBe('DE')

    // An explicit `region` on the nested root still overrides, same as any other prop change.
    await page.evaluate(() => {
      const inner = document.querySelector('[data-testid="inner-root"]') as any
      inner.region = 'IT'
    })

    expect(await page.evaluate(() => (window as any).DesignSystem.config.region)).toBe('IT')
  })

  test('a legalLinks value set before mount is preserved and merged, not replaced, by a nested ds-root', async ({
    page,
  }) => {
    await page.mount(`<div data-testid="target-root"></div>`)

    await page.evaluate(() => {
      ;(window as any).DesignSystem.config.legalLinks = {
        CH: { de: [{ href: 'https://ch.example.com', label: 'CH' }] },
      }
    })

    await page.evaluate(() => {
      const root = document.createElement('ds-root')
      root.setAttribute('data-testid', 'inner-root')
      document.querySelector('[data-testid="target-root"]')!.appendChild(root)
    })

    // Not clobbered by the nested root mounting with no legalLinks prop.
    expect(await page.evaluate(() => (window as any).DesignSystem.config.legalLinks)).toEqual({
      CH: { de: [{ href: 'https://ch.example.com', label: 'CH' }] },
    })

    // Setting legalLinks for a different region merges in, rather than replacing CH's entry.
    await page.evaluate(() => {
      const inner = document.querySelector('[data-testid="inner-root"]') as any
      inner.legalLinks = { DE: { de: [{ href: 'https://de.example.com', label: 'DE' }] } }
    })

    expect(await page.evaluate(() => (window as any).DesignSystem.config.legalLinks)).toEqual({
      CH: { de: [{ href: 'https://ch.example.com', label: 'CH' }] },
      DE: { de: [{ href: 'https://de.example.com', label: 'DE' }] },
    })
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

  test('emits dsLegalLinksChange only when legalLinks actually changed (deep comparison)', async ({ page }) => {
    await page.mount(`<ds-root data-testid="target-root"></ds-root>`)

    const root = new DsRoot(page.locator('[data-testid="target-root"]'))
    const legalLinksSpy = await root.el.spyOnEvent('dsLegalLinksChange')

    const legalLinks = { CH: { de: [{ href: 'https://example.com', label: 'Legal' }] } }

    await page.evaluate(async legalLinks => {
      const target = document.querySelector('[data-testid="target-root"]') as any
      await target.configChanged({ legalLinks })
    }, legalLinks)

    expect(legalLinksSpy).toHaveReceivedEventTimes(1)
    expect(legalLinksSpy).toHaveReceivedEventDetail(legalLinks)

    // A new object with the same content: no re-render, deep-equal, so no new event.
    await page.evaluate(
      async legalLinks => {
        const target = document.querySelector('[data-testid="target-root"]') as any
        await target.configChanged({ legalLinks })
      },
      JSON.parse(JSON.stringify(legalLinks)),
    )

    expect(legalLinksSpy).toHaveReceivedEventTimes(1)
  })
})
