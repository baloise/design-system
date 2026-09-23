import { DsCheckbox, expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-checkbox value="on">Checkbox</ds-checkbox>`, renderToString, testInfo)

    const dsCheckbox = new DsCheckbox(page.locator('ds-checkbox'))
    await dsCheckbox.assertToBeVisible()
  })

  test('renders ds-checkbox-group and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-checkbox-group control name="heroes" label="Label">
          <ds-checkbox value="steve-rogers">Steve Rogers</ds-checkbox>
          <ds-checkbox value="tony-stark">Tony Stark</ds-checkbox>
        </ds-checkbox-group>
      `,
      renderToString,
      testInfo,
    )

    await expect(page.locator('ds-checkbox-group')).toBeVisible()
  })
})
