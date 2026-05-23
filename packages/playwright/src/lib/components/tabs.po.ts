import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsTabs extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  tab(name: string): Locator {
    return this.el.locator(`ds-tab[name="${name}"]`)
  }

  panel(name: string): Locator {
    return this.el.locator(`ds-tab-panel[for="${name}"]`)
  }

  async selectTab(name: string) {
    await this.tab(name).click()
  }

  async assertTabSelected(name: string) {
    await expect(this.tab(name)).toHaveAttribute('selected', '')
  }

  async assertTabNotSelected(name: string) {
    await expect(this.tab(name)).not.toHaveAttribute('selected', '')
  }

  async assertPanelVisible(name: string) {
    await expect(this.panel(name)).toBeVisible()
  }

  async assertPanelHidden(name: string) {
    await expect(this.panel(name)).toBeHidden()
  }
}
