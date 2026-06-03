import { test, DsData, DsDataItem } from '@baloise/ds-playwright'

test.describe('ds-data', () => {
  test.describe('vertical layout (default)', () => {
    test('should render list of data items', async ({ page }) => {
      await page.mount(`
        <ds-data>
          <ds-data-item>
            <ds-data-label slot="label">Name</ds-data-label>
            <ds-data-value>John Doe</ds-data-value>
          </ds-data-item>
          <ds-data-item>
            <ds-data-label slot="label">Email</ds-data-label>
            <ds-data-value>john@example.com</ds-data-value>
          </ds-data-item>
          <ds-data-item>
            <ds-data-label slot="label">Phone</ds-data-label>
            <ds-data-value>+1 (555) 123-4567</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      await data.assertItemCount(3)
      await data.assertIsNotHorizontal()
    })
  })

  test.describe('horizontal layout', () => {
    test('should render items in horizontal layout when horizontal prop is true', async ({ page }) => {
      await page.mount(`
        <ds-data horizontal>
          <ds-data-item>
            <ds-data-label slot="label">Metric 1</ds-data-label>
            <ds-data-value>100</ds-data-value>
          </ds-data-item>
          <ds-data-item>
            <ds-data-label slot="label">Metric 2</ds-data-label>
            <ds-data-value>200</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      await data.assertIsHorizontal()
      await data.assertItemCount(2)
    })
  })

  test.describe('state props', () => {
    test('should apply disabled state to items', async ({ page }) => {
      await page.mount(`
        <ds-data>
          <ds-data-item disabled>
            <ds-data-label slot="label">Status</ds-data-label>
            <ds-data-value>Inactive</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      const item = new DsDataItem(data.getItem(0))
      await item.assertIsDisabled()
    })

    test('should apply multiline state to items', async ({ page }) => {
      await page.mount(`
        <ds-data>
          <ds-data-item multiline>
            <ds-data-label slot="label">Description</ds-data-label>
            <ds-data-value>This is a long description that spans multiple lines</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      const item = new DsDataItem(data.getItem(0))
      await item.assertIsMultiline()
    })

    test('should apply editable state to items', async ({ page }) => {
      await page.mount(`
        <ds-data>
          <ds-data-item editable>
            <ds-data-label slot="label">Name</ds-data-label>
            <ds-data-value>John</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      const item = new DsDataItem(data.getItem(0))
      await item.assertIsEditable()
    })
  })

  test.describe('semantic accessibility', () => {
    test('should link labels and values within items', async ({ page }) => {
      await page.mount(`
        <ds-data>
          <ds-data-item>
            <ds-data-label slot="label">Name</ds-data-label>
            <ds-data-value>John</ds-data-value>
          </ds-data-item>
        </ds-data>
      `)

      const data = new DsData(page.locator('ds-data'))
      const item = new DsDataItem(data.getItem(0))
      await item.assertLabelLinksToValue()
    })
  })
})
