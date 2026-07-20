import { afterEach, describe, expect, test } from 'vitest'
import { configFromMetaTag } from './config.meta'

const setMetaTag = (attributes: Record<string, string>) => {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'design-system-config')

  for (const [key, value] of Object.entries(attributes)) {
    meta.setAttribute(`data-${key}`, value)
  }

  document.head.appendChild(meta)
  return meta
}

afterEach(() => {
  document.head.innerHTML = ''
})

describe('configFromMetaTag', () => {
  test('returns an empty object when no meta tag is present', () => {
    expect(configFromMetaTag(window)).toEqual({})
  })

  test('reads only the attributes present on the tag', () => {
    setMetaTag({ brand: 'helvetia', region: 'CH' })

    expect(configFromMetaTag(window)).toEqual({
      brand: 'helvetia',
      region: 'CH',
    })
  })

  test('reads all supported attributes', () => {
    setMetaTag({
      'brand': 'baloise',
      'region': 'DE',
      'language': 'fr',
      'fallback-language': 'de',
      'allowed-languages': 'de,fr,it',
      'animated': 'false',
    })

    expect(configFromMetaTag(window)).toEqual({
      brand: 'baloise',
      region: 'DE',
      language: 'fr',
      fallbackLanguage: 'de',
      allowedLanguages: ['de', 'fr', 'it'],
      animated: false,
    })
  })

  test('ignores unknown data-* attributes', () => {
    const meta = setMetaTag({ brand: 'helvetia' })
    meta.setAttribute('data-http-form-submit', 'false')
    meta.setAttribute('data-legal-links', '{}')
    meta.setAttribute('data-icon-base', '/assets/icons')

    expect(configFromMetaTag(window)).toEqual({ brand: 'helvetia' })
  })

  test('parses a comma-separated allowedLanguages list, trimming whitespace', () => {
    setMetaTag({ 'allowed-languages': 'de, fr,  it' })

    expect(configFromMetaTag(window)).toEqual({
      allowedLanguages: ['de', 'fr', 'it'],
    })
  })

  test('treats any non-"false" value for animated as true', () => {
    setMetaTag({ animated: 'true' })
    expect(configFromMetaTag(window)).toEqual({ animated: true })
  })

  test('returns an empty object when the tag has no supported attributes', () => {
    setMetaTag({})
    expect(configFromMetaTag(window)).toEqual({})
  })

  test('returns an empty object without throwing when document is missing', () => {
    expect(configFromMetaTag({} as Window)).toEqual({})
  })
})
