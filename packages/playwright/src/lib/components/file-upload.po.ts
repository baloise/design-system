import { expect } from '@playwright/test'
import { PageObject } from './page-object'

export class DsFileUpload extends PageObject {
  readonly dropZone = this.el.locator('[part="drop-zone"]')
  readonly fileList = this.el.locator('[part="file-list"]')
  readonly input = this.el.locator('[part="input"]')

  async click() {
    await this.dropZone.click()
  }

  async setFocus() {
    await this.el.evaluate((el: any) => el.setFocus())
  }

  async clear() {
    await this.el.evaluate((el: any) => el.clear())
  }

  async assertToBeDisabled() {
    await expect(this.el).toHaveAttribute('disabled', '')
  }

  async assertToBeInvalid() {
    await expect(this.el).toHaveAttribute('invalid', '')
  }

  async assertToBeLoading() {
    await expect(this.el).toHaveAttribute('loading', '')
  }

  async assertToBeReadonly() {
    await expect(this.el).toHaveAttribute('readonly', '')
  }

  async assertToBeRequired() {
    await expect(this.el).toHaveAttribute('required', '')
  }

  async assertHasFileList() {
    await expect(this.fileList).toBeVisible()
  }

  async assertHasNoFileList() {
    await expect(this.fileList).not.toBeVisible()
  }
}
