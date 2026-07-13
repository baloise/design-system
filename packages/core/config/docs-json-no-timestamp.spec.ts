import { describe, expect, it } from 'vitest'
import { parsePOFile } from './docs-json-no-timestamp'

const BUTTON_PO = `
import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsButton extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  async click() {
    await this.el.click()
  }

  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }

  async assertToBeDisabled() {
    await expect(this.el).toHaveAttribute('disabled')
  }

  async assertToBeEnabled() {
    await expect(this.el).not.toHaveAttribute('disabled')
  }
}
`

const INPUT_PO = `
import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsInput extends PageObject {
  readonly nativeInput: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeInput = el.locator('[part="input"]')
  }

  async clear() {
    await this.nativeInput.clear()
  }

  async fill(value: string) {
    await this.nativeInput.fill(value)
  }

  async assertValue(value: string) {
    await expect(this.nativeInput).toHaveValue(value)
  }
}
`

describe('parsePOFile', () => {
  it('returns null when no PageObject subclass found', () => {
    expect(parsePOFile('export class Foo {}')).toBeNull()
    expect(parsePOFile('')).toBeNull()
  })

  it('extracts the class name', () => {
    expect(parsePOFile(BUTTON_PO)?.class).toBe('DsButton')
    expect(parsePOFile(INPUT_PO)?.class).toBe('DsInput')
  })

  it('always sets import to @baloise/ds-playwright', () => {
    expect(parsePOFile(BUTTON_PO)?.import).toBe('@baloise/ds-playwright')
  })

  it('skips the constructor', () => {
    const result = parsePOFile(BUTTON_PO)
    const all = [...(result?.actions ?? []), ...(result?.assertions ?? [])]
    expect(all.find(m => m.name === 'constructor')).toBeUndefined()
  })

  it('classifies assert* methods as assertions', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.assertions.map(a => a.name)).toEqual([
      'assertToContainText',
      'assertToBeDisabled',
      'assertToBeEnabled',
    ])
  })

  it('classifies non-assert methods as actions', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.actions.map(a => a.name)).toEqual(['click'])
  })

  it('extracts parameters with name and type', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.assertions.find(a => a.name === 'assertToContainText')?.params).toEqual([
      { name: 'text', type: 'string' },
    ])
  })

  it('returns empty params array for zero-argument methods', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.actions.find(a => a.name === 'click')?.params).toEqual([])
  })

  it('extracts readonly Locator properties as locators', () => {
    const result = parsePOFile(INPUT_PO)
    expect(result?.locators).toEqual([{ name: 'nativeInput', type: 'Locator', docs: '' }])
  })

  it('returns empty locators array when no Locator properties defined', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.locators).toEqual([])
  })

  it('sets docs to empty string when no JSDoc present', () => {
    const result = parsePOFile(BUTTON_PO)
    expect(result?.actions.find(a => a.name === 'click')?.docs).toBe('')
  })

  it('extracts JSDoc comment text when present above a method', () => {
    const content = `
export class DsTag extends PageObject {
  /**
   * Removes the tag from the DOM.
   */
  async remove() {
    await this.el.click()
  }
}
`
    const result = parsePOFile(content)
    expect(result?.actions.find(a => a.name === 'remove')?.docs).toBe('Removes the tag from the DOM.')
  })
})
