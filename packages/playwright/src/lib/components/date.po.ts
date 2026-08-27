import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsDate extends PageObject {
  readonly nativeInput: Locator
  readonly triggerButton: Locator
  readonly clearButton: Locator
  private readonly inline: boolean

  constructor(el: E2ELocator, options?: { inline?: boolean }) {
    super(el)
    this.inline = options?.inline ?? false
    this.nativeInput = el.locator('[part="input"]')
    this.triggerButton = el.locator('[part="trigger"]')
    this.clearButton = el.locator('[part="clear"]')
  }

  async type(formattedDate: string) {
    await this.nativeInput.click()
    await this.nativeInput.pressSequentially(formattedDate)
  }

  async pick(isoDate: string) {
    const [yearStr, monthStr, dayStr] = isoDate.split('-')
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10) - 1 // air-datepicker uses 0-indexed months
    const day = parseInt(dayStr, 10)

    if (!this.inline) {
      await this.triggerButton.click()
    }

    const targetCell = this.el.locator(
      `.air-datepicker-cell.-day-[data-year="${year}"][data-month="${month}"][data-date="${day}"]`,
    )
    const currentMonthCell = this.el.locator('.air-datepicker-cell.-day-:not(.-other-month-)').first()
    const prevButton = this.el.locator('[data-action="prev"] button')
    const nextButton = this.el.locator('[data-action="next"] button')

    await currentMonthCell.waitFor({ state: 'visible' })

    for (let i = 0; i < 24; i++) {
      if (await targetCell.isVisible()) break

      const currentYear = parseInt((await currentMonthCell.getAttribute('data-year')) ?? '0', 10)
      const currentMonth = parseInt((await currentMonthCell.getAttribute('data-month')) ?? '0', 10)

      if (year * 12 + month > currentYear * 12 + currentMonth) {
        await nextButton.click()
      } else {
        await prevButton.click()
      }

      await currentMonthCell.waitFor({ state: 'visible' })
    }

    await targetCell.click()
  }

  async clear() {
    await this.clearButton.click()
  }

  async blur() {
    if (!this.inline) {
      await this.nativeInput.blur()
    }
  }

  async assertValue(value: string) {
    if (this.inline) {
      await expect(this.el).toHaveAttribute('value', value)
    } else {
      await expect(this.nativeInput).toHaveValue(value)
    }
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
  }
}
