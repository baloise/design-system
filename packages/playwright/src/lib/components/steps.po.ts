import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsSteps extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  step(name: string): Locator {
    return this.el.locator(`ds-step[name="${name}"]`)
  }

  panel(name: string): Locator {
    return this.el.locator(`ds-step-panel[for="${name}"]`)
  }

  async selectStep(name: string) {
    await this.step(name).click({ force: true })
  }

  async assertStepSelected(name: string) {
    await expect(this.step(name)).toHaveAttribute('selected', '')
  }

  async assertStepNotSelected(name: string) {
    await expect(this.step(name)).not.toHaveAttribute('selected', '')
  }

  async assertPanelVisible(name: string) {
    await expect(this.panel(name)).toBeVisible()
  }

  async assertPanelHidden(name: string) {
    await expect(this.panel(name)).toBeHidden()
  }
}
