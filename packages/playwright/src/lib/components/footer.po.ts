import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsFooter extends PageObject {
  readonly languageSelect: Locator
  readonly legal: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.languageSelect = this.el.locator('[data-testid="footer-language-select"]')
    this.legal = this.el.locator('.legal')
  }

  links(): Locator {
    return this.el.locator('.link-list a, [slot="links"]')
  }

  socialLinks(): Locator {
    return this.el.locator('.social-list a, [slot="social-links"]')
  }

  async selectLanguage(languageCode: string) {
    await this.languageSelect.selectOption(languageCode)
  }

  async assertLanguageSelectVisible() {
    await expect(this.languageSelect).toBeVisible()
  }

  async assertLanguageSelectHidden() {
    await expect(this.languageSelect).toHaveCount(0)
  }

  async assertLegalTextContains(text: string) {
    await expect(this.legal).toContainText(text)
  }

  async assertLinksCount(count: number) {
    await expect(this.links()).toHaveCount(count)
  }

  async assertSocialLinksCount(count: number) {
    await expect(this.socialLinks()).toHaveCount(count)
  }
}
