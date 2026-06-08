import { DsFileUpload, test } from '@baloise/ds-playwright'
import { expect } from '@playwright/test'

test.describe('component', () => {
  test.describe('events', () => {
    test('should emit dsFocus on input focus', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))
      const spy = await component.el.spyOnEvent('dsFocus')

      await component.input.focus()
      expect(spy).toHaveReceivedEventTimes(1)
    })

    test('should emit dsBlur on input blur', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))
      const spy = await component.el.spyOnEvent('dsBlur')

      await component.input.focus()
      await component.input.blur()
      expect(spy).toHaveReceivedEventTimes(1)
    })

    test('should emit dsInputClick on input click', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))
      const spy = await component.el.spyOnEvent('dsInputClick')

      await component.click()
      await page.waitForChanges()
      expect(spy).toHaveReceivedEventTimes(1)
    })

    test('should not emit dsInputClick when disabled', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" disabled></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))
      const spy = await component.el.spyOnEvent('dsInputClick')

      await component.click()
      await page.waitForChanges()

      await component.assertToBeDisabled()
      expect(spy).toHaveReceivedEventTimes(0)
    })
  })

  test.describe('state', () => {
    test('should render disabled state', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" disabled></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.assertToBeDisabled()
    })

    test('should render invalid state', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" invalid></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.assertToBeInvalid()
    })

    test('should render loading state', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" loading></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.assertToBeLoading()
    })

    test('should render readonly state', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" readonly></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.assertToBeReadonly()
    })

    test('should render required state', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" required></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.assertToBeRequired()
    })
  })

  test.describe('methods', () => {
    test('should clear files with clear() method', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" has-file-list="false"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.clear()

      const input = component.input
      expect(input).toBeDefined()
    })

    test('should set focus with setFocus() method', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await component.setFocus()

      await expect(component.input).toBeFocused()
    })
  })

  test.describe('drop-zone', () => {
    test('should have accessible drop-zone part', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.dropZone).toBeVisible()
    })

    test('should hide file-list when has-file-list is false', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" has-file-list="false"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.fileList).toBeHidden()
    })
  })

  test.describe('multiple prop', () => {
    test('should allow multiple files when multiple is true', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" multiple></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.input).toHaveAttribute('multiple', '')
    })

    test('should allow single file when multiple is false', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" multiple="false"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.input).not.toHaveAttribute('multiple')
    })
  })

  test.describe('color variant', () => {
    test('should render with primary color', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" color="primary"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.el).toHaveAttribute('color', 'primary')
    })

    test('should render with success color', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" color="success"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.el).toHaveAttribute('color', 'success')
    })

    test('should render with warning color', async ({ page }) => {
      await page.mount(`<ds-file-upload label="Upload" color="warning"></ds-file-upload>`)
      const component = new DsFileUpload(page.locator('ds-file-upload'))

      await expect(component.el).toHaveAttribute('color', 'warning')
    })
  })
})
