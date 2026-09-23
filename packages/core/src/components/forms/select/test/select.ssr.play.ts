import { DsSelect, expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates with declarative ds-select-option/ds-select-optgroup markup', async ({
    page,
  }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-select label="Country">
          <ds-select-option value="ch">Switzerland</ds-select-option>
          <ds-select-optgroup label="Neighbours">
            <ds-select-option value="de">Germany</ds-select-option>
            <ds-select-option value="fr">France</ds-select-option>
          </ds-select-optgroup>
        </ds-select>
      `,
      renderToString,
      testInfo,
    )

    const select = new DsSelect(page.locator('ds-select'))
    await select.assertToBeVisible()
    await expect(page.locator('ds-select-optgroup')).toHaveCount(1)
  })
})
