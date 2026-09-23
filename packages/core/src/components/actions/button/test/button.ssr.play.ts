import { DsButton, expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-button>Click me</ds-button>`, renderToString, testInfo)

    const dsButton = new DsButton(page.locator('ds-button'))
    await dsButton.assertToBeVisible()
    await dsButton.assertToContainText('Click me')
  })

  test('renders ds-button-group and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-button-group>
          <ds-button>Left</ds-button>
          <ds-button>Right</ds-button>
        </ds-button-group>
      `,
      renderToString,
      testInfo,
    )

    await expect(page.locator('ds-button-group')).toBeVisible()
  })
})
