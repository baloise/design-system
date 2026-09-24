import { DsRadio, expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-radio value="option-1">Option 1</ds-radio>`, renderToString, testInfo)

    const radio = new DsRadio(page.locator('ds-radio'))
    await radio.assertToBeVisible()
  })

  test('renders ds-radio-group and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-radio-group name="heroes" label="Label">
          <ds-radio value="steve-rogers">Steve Rogers</ds-radio>
          <ds-radio value="tony-stark">Tony Stark</ds-radio>
        </ds-radio-group>
      `,
      renderToString,
      testInfo,
    )

    await expect(page.locator('ds-radio-group')).toBeVisible()
  })
})
